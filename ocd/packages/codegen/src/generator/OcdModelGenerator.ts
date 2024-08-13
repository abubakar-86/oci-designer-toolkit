/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
// TODO: Remove Following
// @ts-nocheck

import { OcdCodeGenerator } from './OcdCodeGenerator.js'
import { OciCodeGenerator } from './OciCodeGenerator.js'

export class OcdModelGenerator extends OciCodeGenerator {
    constructor (prefix: string='Oci') {
        super(prefix)
        this.ignoreAttributes = [...this.commonElements, ...this.commonIgnoreElements]
    }

    /*
    ** Content for the top level file. This will only be created if it does not exists.
    */
    // ${schemaObjects.map(i => this.interface(i)).filter(i => i.trim() !== '').join('')}
    // ${schemaObjects.map(i => this.namespaceFunction(resource, i)).filter(i => i.trim() !== '').join('')}
    // export interface ${this.interfaceName(resource)} extends AutoGenerated.${this.idToInterfaceName(resource)}.${this.idToInterfaceName(resource)} {}
    // ${schemaObjects.map(i => this.generateNamespaceReference(i.id, resource, i.id.split('.').length)).filter(i => i.trim() !== '').join('\n    ')}
    // ${schemaObjects.map(i => this.namespaceFunction(resource, i)).filter(i => i.trim() !== '').join('')}
    content = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        const nestedObjects = Object.entries(schema.attributes).filter(([k, v]) => v.attributes)
        const contents = `${this.copyright()}

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./${this.generatedDirectory()}/${this.idToInterfaceName(resource)}"

export interface ${this.idToInterfaceName(resource)} extends AutoGenerated.${this.idToInterfaceName(resource)} {}

export namespace ${this.idToNamespaceName(resource)} {
    ${nestedObjects.map(([k, v]) => this.generatedNestedNamespaceReferences(resource, v.id, v.attributes, 1)).join(`\n${this.indentation[1]}`)}
    export function newResource(type?: string): ${this.idToInterfaceName(resource)} {
        const resource = {
            ...AutoGenerated.${this.autoGeneratedNamespaceName(resource)}.newResource('${resource}'),
        }
        return resource
    }
    export function cloneResource(resource: ${this.idToInterfaceName(resource)}, type?: string): ${this.idToInterfaceName(resource)} {
        return AutoGenerated.${this.autoGeneratedNamespaceName(resource)}.cloneResource(resource, '${resource}') as ${this.idToInterfaceName(resource)}
    }
    export function allowedParentTypes(): string[] {
        return []
    }
    export function getParentId(resource: ${this.idToInterfaceName(resource)}): string {
        const parentId = resource.compartmentId
        return parentId
    }
    export function setParentId(resource: ${this.idToInterfaceName(resource)}, parentId: string): ${this.idToInterfaceName(resource)} {
        return resource
    }
    export function getConnectionIds(resource: ${this.idToInterfaceName(resource)}, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        let associationIds: string[] = []
        return associationIds
    }
}

export class ${this.idToClassName(resource)} extends AutoGenerated.${this.idToClassName(resource)} {
    static new(): ${this.idToInterfaceName(resource)} {
        return ${this.idToNamespaceName(resource)}.newResource()
    }
    static clone(resource: ${this.idToInterfaceName(resource)}): ${this.idToInterfaceName(resource)} {
        return ${this.idToNamespaceName(resource)}.cloneResource(resource)
    }
}

export default ${this.idToClassName(resource)}
`
        return contents
    }
    generatedNestedNamespaceReferences = (resource: string, id: string, attributes: Record<string, any>, level: number=1): string => {
        const nestedObjects = Object.entries(attributes).filter(([k, v]) => v.attributes)
        const name = id.split('.').at(-1)
        const hierarchy = `AutoGenerated.${this.idToNamespaceName(resource)}.${this.idToNamespaceHierarchy(id, level)}`
        return `export namespace ${this.idToNamespaceName(name, level)} {
${this.indentation[level]}    export interface ${this.idToInterfaceName(name, level)} extends ${hierarchy}.${this.idToInterfaceName(name, level)} {}
${this.indentation[level]}    export function ${this.generateNewFunction(name, level)}(): ${this.idToInterfaceName(name, level)} {return ${hierarchy}.${this.generateNewFunction(name, level)}()}
${this.indentation[level]}    ${nestedObjects.map(([k, v]) => this.generatedNestedNamespaceReferences(resource, v.id, v.attributes, level + 1)).join(`\n${this.indentation[level]}    `)}
${this.indentation[level]}}`
    }
    // TODO: Delete
    contentOld = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        const contents = `${this.copyright()}

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./${this.generatedDirectory()}/${this.interfaceName(resource)}"

export interface ${this.interfaceName(resource)} extends AutoGenerated.${this.autoGeneratedInterfaceName(resource)} {}
${schemaObjects.map(i => this.interface(i)).filter(i => i.trim() !== '').join('')}
export namespace ${this.namespaceName(resource)} {
    ${schemaObjects.map(i => this.namespaceInterface(resource, i)).filter(i => i.trim() !== '').join('')}
    export function newResource(type?: string): ${this.interfaceName(resource)} {
        return {
            ...AutoGenerated.${this.autoGeneratedNamespaceName(resource)}.newResource('${resource}'),
        }
    }
    export function cloneResource(resource: ${this.interfaceName(resource)}, type?: string): ${this.interfaceName(resource)} {
        return AutoGenerated.${this.autoGeneratedNamespaceName(resource)}.cloneResource(resource, '${resource}') as ${this.interfaceName(resource)}
    }
    export function allowedParentTypes(): string[] {
        // console.debug('${this.namespaceName(resource)}: Allowed Parent Types')
        return []
    }
    export function getParentId(resource: ${this.interfaceName(resource)}): string {
        // console.debug('${this.namespaceName(resource)}: Getting Parent Id to for', resource.displayName, resource.id)
        return resource.compartmentId
    }
    export function setParentId(resource: ${this.interfaceName(resource)}, parentId: string): ${this.interfaceName(resource)} {
        // console.debug('${this.namespaceName(resource)}: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        return resource
    }
    export function getConnectionIds(resource: ${this.interfaceName(resource)}, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        // console.debug('${this.namespaceName(resource)}: Getting Connection Ids to for', resource.displayName, resource.id)
        return []
    }
    ${schemaObjects.map(i => this.namespaceFunction(resource, i)).filter(i => i.trim() !== '').join('')}
}

export class ${this.className(resource)} {
    static new(): ${this.interfaceName(resource)} {
        return ${this.namespaceName(resource)}.newResource()
    }
    static clone(resource: ${this.interfaceName(resource)}): ${this.interfaceName(resource)} {
        return ${this.namespaceName(resource)}.cloneResource(resource)
    }
}

export default ${this.className(resource)}
`
        return contents
    }

    /*
    ** Content for the auto generated file this will be written on each execution.
    */
    autoGeneratedContent = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        this.resourceObjects[resource] = schemaObjects.map(i => this.interfaceName(i.name))
        const contents = `${this.copyright()}
${this.autoGeneratedWarning()}

import { ${this.prefix}Resource } from "../../${this.prefix}Resource"

export interface ${this.idToInterfaceName(resource)} extends ${this.idToNamespaceName(resource)}.${this.idToInterfaceName(resource)} {}
${this.generateAutoGeneratedNamespace(resource, schema.attributes)}
${this.generateAutoGeneratedClass(resource)}

export default ${this.idToClassName(resource)}
`
        return contents
    }
    generateAutoGeneratedNamespace = (id: string, attributes: Record<string, any>, level: number=0): string => {
        const nestedObjects = Object.entries(attributes).filter(([k, v]) => v.attributes)
        // console.debug('Auto Generated:', id, attributes)
        return `
${this.indentation[level]}export namespace ${this.idToNamespaceName(id, level)} {${level === 0 ? `\n${this.indentation[level]}    export function newResource(type: string='${id}'): ${this.idToInterfaceName(id, level)} {return ${this.generateNewFunction(id, level)}(type)}` : ''}${level === 0 ? `\n${this.indentation[level]}    export function cloneResource(resource: ${this.idToInterfaceName(id, level)}, type: string) {return ${this.prefix}Resource.cloneResource(resource, type)}` : ''}
${this.indentation[level]}    export interface ${this.idToInterfaceName(id, level)} ${level === 0 ? `extends ${this.prefix}Resource ` : ''} {
${this.indentation[level]}        ${Object.entries(attributes).filter(([k, v]) => !this.ignoreAttributes.includes(v.id)).map(([k, a]) => this.interfaceAttributeDefinition(a, level+1)).join(`\n        ${this.indentation[level]}`)}
${this.indentation[level]}    }
${this.indentation[level]}    export function ${this.generateNewFunction(id, level)}(${level === 0 ? 'type: string' : ''}): ${this.idToInterfaceName(id, level)} {
${this.indentation[level]}        return {
${this.indentation[level]}            ${level === 0 ? `...${this.prefix}Resource.newResource(type),\n${this.indentation[level]}            ` : ''}${Object.entries(attributes).filter(([k, v]) => !this.ignoreAttributes.includes(v.id)).map(([k, a]) => this.namespaceAttributeAssignment(id, a, level+1)).join(`,\n            ${this.indentation[level]}`)}
${this.indentation[level]}        }
${this.indentation[level]}    }
${this.indentation[level]}${nestedObjects.map(([k, v]) => this.generateAutoGeneratedNamespace(k, v.attributes, level + 1)).join(`${this.indentation[level]}`)}
${this.indentation[level]}}`
    }
    generateAutoGeneratedClass = (id: string, level: number=0): string => {
        return `
export class ${this.idToClassName(id, level)} {
    static new(): ${this.idToInterfaceName(id, level)}.${this.idToInterfaceName(id, level)} {
        return ${this.idToInterfaceName(id, level)}.newResource('${id}')
    }
}
`
    }
    // TODO: Delete
    autoGeneratedContentOld = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        this.resourceObjects[resource] = schemaObjects.map(i => this.interfaceName(i.name))
        const contents = `${this.copyright()}
${this.autoGeneratedWarning()}

import { ${this.prefix}Resource } from "../../${this.prefix}Resource"

/*
** New Generation Code (Start)
*/
${this.generateAutoGeneratedNamespace(resource, schema.attributes)}
/*
** New Generation Code (End)
*/

export interface ${this.autoGeneratedInterfaceName(resource)} extends ${this.prefix}Resource {
    ${Object.entries(schema.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(v.id)).map(([k, a]) => this.interfaceAttributeDefinition(a)).join('\n    ')}
}

${schemaObjects.map(i => this.autoGeneratedInterface(i)).filter(i => i.trim() !== '').join('')}

export namespace ${this.autoGeneratedNamespaceName(resource)} {
    ${schemaObjects.map(i => this.autoGeneratedNamespaceInterface(i)).filter(i => i.trim() !== '').join('')}
    export function newResource(type: string): ${this.autoGeneratedInterfaceName(resource)} {
        return {
            ...${this.prefix}Resource.newResource(type),
            ${Object.entries(schema.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(v.id)).map(([k, a]) => this.namespaceAttributeAssignment(resource, a)).join(',\n            ')}
        }
    }
    export function cloneResource(resource: ${this.autoGeneratedInterfaceName(resource)}, type: string) {
        const clone = ${this.prefix}Resource.cloneResource(resource, type)
        return clone
    }
    ${schemaObjects.map(i => this.autoGeneratedNamespaceFunction(resource, i)).filter(i => i.trim() !== '').join('')}
}

export class ${this.autoGeneratedClassName(resource)} {
    static new(): ${this.autoGeneratedInterfaceName(resource)} {
        return ${this.autoGeneratedNamespaceName(resource)}.newResource('${resource}')
    }
}

export default ${this.autoGeneratedClassName(resource)}
`
        return contents
    }

    /*
    ** Content for the auto generated resource summary file this will be written on each execution.
    */
    resourcesFileContent(resources) {
        // , ...this.resourceObjects[r]
        const contents = `${this.copyright()}
${this.autoGeneratedWarning()}

${resources.sort().map((r) => `export { ${[this.namespaceName(r), this.className(r)].join(', ')} } from './${this.resourcesDirectory()}/${this.namespaceName(r)}'`).join('\n')}
    `
            return contents
    }

    interfaceAttributeDefinition = (attribute, level: number=0) => {
        const name = attribute.name
        if (attribute.type === 'string')      return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: string`
        else if (attribute.type === 'bool')   return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: boolean`
        else if (attribute.type === 'number') return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: number`
        else if (attribute.type === 'object') return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: ${this.generateInterfaceReference(name, level)}`
        // else if (attribute.type === 'object') return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: ${this.interfaceName(attribute.id)}`
        else if (attribute.type === 'list')   return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: ${attribute.subtype === 'object' ? this.generateInterfaceReference(name, level) : attribute.subtype}[]`
        // else if (attribute.type === 'list')   return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: ${attribute.subtype === 'object' ? this.interfaceName(attribute.id) : attribute.subtype}[]`
        else if (attribute.type === 'set')    return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: ${attribute.subtype}[]`
        else if (attribute.type === 'map')    return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: {[key: string]: string}`
        else return ''
    }

    namespaceAttributeAssignment = (resource, attribute, level: number=0) => {
        const name = attribute.name
        if (attribute.type === 'string')      return `${this.toCamelCase(name)}: '${attribute.default ? attribute.default : ''}'`
        else if (attribute.type === 'bool')   return `${this.toCamelCase(name)}: ${attribute.default ? attribute.default : 'false'}`
        else if (attribute.type === 'number') return `${this.toCamelCase(name)}: ${attribute.default ? attribute.default : '0'}`
        else if (attribute.type === 'object') return `${this.toCamelCase(name)}: ${this.generateNewFunctionCall(name, level)}`
        else if (attribute.type === 'object') return `${this.toCamelCase(name)}: ${this.autoGeneratedNamespaceName(resource)}.${this.namespaceFunctionName(attribute.id)}()`
        else if (attribute.type === 'list')   return `${this.toCamelCase(name)}: ${attribute.default ? attribute.default : '[]'}`
        else if (attribute.type === 'set')    return `${this.toCamelCase(name)}: []`
        else if (attribute.type === 'map')    return `${this.toCamelCase(name)}: {}`
        else return ''
    }

    autoGeneratedInterface = (i) => {
        return `
export interface ${this.interfaceName(i.id)} {
    ${Object.entries(i.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(v.id)).map(([k, a]) => this.interfaceAttributeDefinition(a)).join('\n    ')}
}
`
    }

    autoGeneratedNamespaceInterface = (i) => {
        return `
    export interface ${this.interfaceName(i.id)} {
        ${Object.entries(i.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(v.id)).map(([k, a]) => this.interfaceAttributeDefinition(a)).join('\n        ')}
    }`
    }

    interface = (i) => {
        return `
export interface ${this.interfaceName(i.id)} extends AutoGenerated.${this.interfaceName(i.id)} {}
`
    }

    namespaceInterface = (resource, i) => {
        return `
    export interface ${this.interfaceName(i.id)} extends AutoGenerated.${this.autoGeneratedNamespaceName(resource)}.${this.interfaceName(i.id)} {}
`
    }

    autoGeneratedNamespaceFunction = (resource, i) => {
        return `
    export function ${this.namespaceFunctionName(i.id)}(): ${this.interfaceName(i.id)} {
        return {
            ${Object.entries(i.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(v.id)).map(([k, a]) => this.namespaceAttributeAssignment(resource, a)).join(',\n            ')}
        }
    }
`
    }

    namespaceFunction = (resource, i) => {
        return `
    export function ${this.namespaceFunctionName(i.id)}(): ${this.interfaceName(i.id)} {
        return {
            ...AutoGenerated.${this.autoGeneratedNamespaceName(resource)}.${this.namespaceFunctionName(i.id)}(),
        }
    }
`
    }

    // namespaceFunctionName = (name) => `new${this.interfaceName(name)}`

    outputFilename = (resource) => `${this.modelFilename(resource)}.ts`

    // resourceName = (resource) => `${this.resourceModelName(resource)}`
    // autoGeneratedResourceName = (resource) => `${super.autoGeneratedResourceName(resource)}`

    // className = (resource) => `${this.resourceName(resource)}Client`
    // autoGeneratedClassName = (resource) => `${this.autoGeneratedResourceName(resource)}Client`

    // interfaceName = (resource) => this.resourceName(resource)
    // autoGeneratedInterfaceName = (resource) => this.autoGeneratedResourceName(resource)

    // modelNamespaceName = (resource) => this.resourceName(resource)
    // autoGeneratedNamespaceName = (resource) => this.autoGeneratedResourceName(resource)
}

export default OcdModelGenerator
module.exports = { OcdModelGenerator }
