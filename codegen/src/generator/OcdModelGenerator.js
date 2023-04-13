/*
** Copyright (c) 2020, 2022, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdCodeGenerator } from './OcdCodeGenerator.js'

export class OcdModelGenerator extends OcdCodeGenerator {
    constructor () {
        super()
        this.ignoreAttributes = [...this.commonElements, ...this.commonIgnoreElements]
    }

    /*
    ** Content for the top level file. This will only be created if it does not exists.
    */
    // ${schemaObjects.map(i => this.interface(i)).filter(i => i.trim() !== '').join('')}
    // ${schemaObjects.map(i => this.namespaceFunction(resource, i)).filter(i => i.trim() !== '').join('')}
    content = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        const contents = `${this.copyright()}

import * as AutoGenerated from "./${this.generatedDirectory()}/${this.interfaceName(resource)}"

export interface ${this.interfaceName(resource)} extends AutoGenerated.${this.autoGeneratedInterfaceName(resource)} {}
${schemaObjects.map(i => this.interface(i)).filter(i => i.trim() !== '').join('')}
export namespace ${this.modelNamespaceName(resource)} {
    export function newResource(type?: string): ${this.interfaceName(resource)} {
        return {
            ...AutoGenerated.${this.autoGeneratedNamespaceName(resource)}.newResource('${resource}'),
        }
    }
    ${schemaObjects.map(i => this.namespaceFunction(resource, i)).filter(i => i.trim() !== '').join('')}
}

export class ${this.className(resource)} {
    static new(): ${this.interfaceName(resource)} {
        return ${this.modelNamespaceName(resource)}.newResource()
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
        const contents = `${this.copyright()}
${this.autoGeneratedWarning()}

import { ${this.prefix}Resource } from "../../${this.prefix}Resource"

export interface ${this.autoGeneratedInterfaceName(resource)} extends ${this.prefix}Resource {
    ${Object.entries(schema.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(k)).map(([k, a]) => this.interfaceAttributeDefinition(k, a)).join('\n    ')}
}

${schemaObjects.map(i => this.autoGeneratedInterface(i)).filter(i => i.trim() !== '').join('')}

export namespace ${this.autoGeneratedNamespaceName(resource)} {
    export function newResource(type: string): ${this.autoGeneratedInterfaceName(resource)} {
        return {
            ...OciResource.newResource(type),
            ${Object.entries(schema.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(k)).map(([k, a]) => this.namespaceAttributeAssignment(resource, k, a)).join(',\n            ')}
        }
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
        const contents = `${this.copyright()}
${this.autoGeneratedWarning()}

${resources.sort().map((r) => `export { ${this.modelNamespaceName(r)}, ${this.className(r)} } from './${this.resourcesDirectory()}/${this.modelNamespaceName(r)}'`).join('\n')}
    `
            return contents
    }

    interfaceAttributeDefinition = (name, attribute) => {
        if (attribute.type === 'string')      return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: string`
        else if (attribute.type === 'bool')   return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: boolean`
        else if (attribute.type === 'number') return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: number`
        else if (attribute.type === 'object') return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: ${this.interfaceName(name)}`
        else if (attribute.type === 'list')   return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: ${attribute.subtype === 'object' ? this.interfaceName(name) : attribute.subtype}[]`
        else if (attribute.type === 'set')    return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: ${attribute.subtype}[]`
        else if (attribute.type === 'map')    return `${this.toCamelCase(name)}${attribute.required ? '' : '?'}: {[key: string]: string}`
        else return ''
    }

    namespaceAttributeAssignment = (resource, name, attribute) => {
        if (attribute.type === 'string')      return `${this.toCamelCase(name)}: ''`
        else if (attribute.type === 'bool')   return `${this.toCamelCase(name)}: false`
        else if (attribute.type === 'number') return `${this.toCamelCase(name)}: 0`
        else if (attribute.type === 'object') return `${this.toCamelCase(name)}: ${this.autoGeneratedNamespaceName(resource)}.${this.namespaceFunctionName(name)}()`
        else if (attribute.type === 'list')   return `${this.toCamelCase(name)}: []`
        else if (attribute.type === 'set')    return `${this.toCamelCase(name)}: []`
        else if (attribute.type === 'map')    return `${this.toCamelCase(name)}: {}`
        else return ''
    }

    autoGeneratedInterface = (i) => {
        return `
export interface ${this.interfaceName(i.name)} {
    ${Object.entries(i.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(k)).map(([k, a]) => this.interfaceAttributeDefinition(k, a)).join('\n    ')}
}
`
    }

    interface = (i) => {
        return `
export interface ${this.interfaceName(i.name)} extends AutoGenerated.${this.interfaceName(i.name)}{}
`
    }

    autoGeneratedNamespaceFunction = (resource, i) => {
        return `
    export function ${this.namespaceFunctionName(i.name)}(): ${this.interfaceName(i.name)} {
        return {
            ${Object.entries(i.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(k)).map(([k, a]) => this.namespaceAttributeAssignment(resource, k, a)).join(',\n            ')}
        }
    }
`
    }

    namespaceFunction = (resource, i) => {
        return `
    export function ${this.namespaceFunctionName(i.name)}(): ${this.interfaceName(i.name)} {
        return {
            ...AutoGenerated.${this.autoGeneratedNamespaceName(resource)}.${this.namespaceFunctionName(i.name)}(),
        }
    }
`
    }

    namespaceFunctionName = (name) => `new${this.interfaceName(name)}`

    resourceFilename = (resource) => `${this.resourceModelFilename(resource)}.ts`

    resourceName = (resource) => `${this.resourceModelName(resource)}`
    autoGeneratedResourceName = (resource) => `${super.autoGeneratedResourceName(resource)}Model`

    className = (resource) => `${this.resourceName(resource)}Client`
    autoGeneratedClassName = (resource) => `${this.autoGeneratedResourceName(resource)}Client`

    interfaceName = (resource) => this.resourceName(resource)
    autoGeneratedInterfaceName = (resource) => this.autoGeneratedResourceName(resource)

    // modelNamespaceName = (resource) => this.resourceName(resource)
    autoGeneratedNamespaceName = (resource) => this.autoGeneratedResourceName(resource)
}

export default OcdModelGenerator
