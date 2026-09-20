type JsonType =
  | { kind: "string" }
  | { kind: "number" }
  | { kind: "boolean" }
  | { kind: "null" }
  | { kind: "unknown" }
  | { kind: "array"; element: JsonType }
  | { kind: "object"; properties: Record<string, ObjectProperty> }
  | { kind: "union"; members: JsonType[] }

type ObjectType = Extract<JsonType, { kind: "object" }>
type ArrayType = Extract<JsonType, { kind: "array" }>

type ObjectProperty = {
  type: JsonType
  optional: boolean
}

const IDENTIFIER_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const KIND_ORDER: Record<JsonType["kind"], number> = {
  boolean: 0,
  number: 1,
  string: 2,
  null: 3,
  object: 4,
  array: 5,
  unknown: 6,
  union: 7,
}

export function getType(value: unknown): string {
  return renderType(inferType(value), 0)
}

function inferType(value: unknown): JsonType {
  if (value === null) {
    return { kind: "null" }
  }

  if (typeof value === "string") {
    return { kind: "string" }
  }

  if (typeof value === "number") {
    return { kind: "number" }
  }

  if (typeof value === "boolean") {
    return { kind: "boolean" }
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { kind: "array", element: { kind: "unknown" } }
    }

    return {
      kind: "array",
      element: value.map(inferType).reduce(mergeTypes),
    }
  }

  if (isPlainObject(value)) {
    const properties: Record<string, ObjectProperty> = {}

    for (const [key, nestedValue] of Object.entries(value)) {
      properties[key] = {
        type: inferType(nestedValue),
        optional: false,
      }
    }

    return { kind: "object", properties }
  }

  return { kind: "unknown" }
}

function mergeTypes(left: JsonType, right: JsonType): JsonType {
  const members = [...flattenUnion(left), ...flattenUnion(right)]
  const objects = members.filter(isObjectType)
  const arrays = members.filter(isArrayType)
  const primitives = members.filter(
    (member) => member.kind !== "object" && member.kind !== "array" && member.kind !== "unknown",
  )

  const merged: JsonType[] = uniquePrimitives(primitives)

  if (objects.length > 0) {
    merged.push(objects.reduce(mergeObjects))
  }

  if (arrays.length > 0) {
    merged.push({
      kind: "array",
      element: arrays.map((arrayType) => arrayType.element).reduce(mergeTypes),
    })
  }

  if (merged.length === 0) {
    return { kind: "unknown" }
  }

  if (merged.length === 1) {
    return merged[0]!
  }

  return {
    kind: "union",
    members: merged.sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]),
  }
}

function mergeObjects(left: ObjectType, right: ObjectType): ObjectType {
  const properties: Record<string, ObjectProperty> = {}
  const keys = [
    ...Object.keys(left.properties),
    ...Object.keys(right.properties).filter((key) => !(key in left.properties)),
  ]

  for (const key of keys) {
    const leftProperty = left.properties[key]
    const rightProperty = right.properties[key]

    if (leftProperty && rightProperty) {
      properties[key] = {
        type: mergeTypes(leftProperty.type, rightProperty.type),
        optional: leftProperty.optional || rightProperty.optional,
      }
      continue
    }

    const present = leftProperty ?? rightProperty
    if (!present) {
      continue
    }

    properties[key] = {
      type: present.type,
      optional: true,
    }
  }

  return { kind: "object", properties }
}

function flattenUnion(type: JsonType): JsonType[] {
  if (type.kind === "union") {
    return type.members.flatMap(flattenUnion)
  }

  return [type]
}

function uniquePrimitives(types: JsonType[]): JsonType[] {
  const seen = new Set<JsonType["kind"]>()
  const unique: JsonType[] = []

  for (const type of types) {
    if (seen.has(type.kind)) {
      continue
    }

    seen.add(type.kind)
    unique.push(type)
  }

  return unique
}

function renderType(type: JsonType, indent: number): string {
  switch (type.kind) {
    case "string":
    case "number":
    case "boolean":
    case "null":
    case "unknown":
      return type.kind
    case "array":
      return renderArrayType(type.element, indent)
    case "object":
      return renderObjectType(type, indent)
    case "union":
      return type.members.map((member) => renderType(member, indent)).join(" | ")
  }
}

function renderArrayType(element: JsonType, indent: number): string {
  const rendered = renderType(element, indent)
  const useGeneric =
    element.kind === "union" || element.kind === "object" || rendered.includes("\n")

  if (useGeneric) {
    return `Array<${rendered}>`
  }

  return `${rendered}[]`
}

function renderObjectType(type: ObjectType, indent: number): string {
  const keys = Object.keys(type.properties)
  if (keys.length === 0) {
    return "{}"
  }

  const innerIndent = "  ".repeat(indent + 1)
  const closeIndent = "  ".repeat(indent)
  const lines = keys.map((key) => {
    const property = type.properties[key]
    if (!property) {
      return ""
    }

    const optionalMark = property.optional ? "?" : ""
    return `${innerIndent}${formatKey(key)}${optionalMark}: ${renderType(property.type, indent + 1)}`
  })

  return `{\n${lines.join("\n")}\n${closeIndent}}`
}

function formatKey(key: string): string {
  if (IDENTIFIER_PATTERN.test(key)) {
    return key
  }

  return JSON.stringify(key)
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isObjectType(type: JsonType): type is ObjectType {
  return type.kind === "object"
}

function isArrayType(type: JsonType): type is ArrayType {
  return type.kind === "array"
}
