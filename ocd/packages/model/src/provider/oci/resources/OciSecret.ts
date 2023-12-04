/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciSecret"

export interface OciSecret extends AutoGenerated.OciSecret {}

export interface OciSecretContent extends AutoGenerated.OciSecretContent {}

export interface OciSecretRules extends AutoGenerated.OciSecretRules {}

export namespace OciSecret {
    
    export interface OciSecretContent extends AutoGenerated.OciSecret.OciSecretContent {}

    export interface OciSecretRules extends AutoGenerated.OciSecret.OciSecretRules {}

    export function newResource(type?: string): OciSecret {
        return {
            ...AutoGenerated.OciSecret.newResource('secret'),
        }
    }
    export function cloneResource(resource: OciSecret, type?: string): OciSecret {
        return AutoGenerated.OciSecret.cloneResource(resource, 'secret') as OciSecret
    }
    export function allowedParentTypes(): string[] {
        console.debug('OciSecret: Allowed Parent Types')
        return ['Vault']
    }
    export function getParentId(resource: OciSecret): string {
        console.debug('OciSecret: Getting Parent Id to for', resource.displayName, resource.id)
        return resource.vaultId
    }
    export function setParentId(resource: OciSecret, parentId: string): OciSecret {
        console.debug('OciSecret: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        resource.vaultId = parentId
        return resource
    }
    export function getConnectionIds(resource: OciSecret): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        console.debug('OciSecret: Getting Connection Ids to for', resource.displayName, resource.id)
        return []
    }
    
    export function newOciSecretContent(): OciSecretContent {
        return {
            ...AutoGenerated.OciSecret.newOciSecretContent(),
        }
    }

    export function newOciSecretRules(): OciSecretRules {
        return {
            ...AutoGenerated.OciSecret.newOciSecretRules(),
        }
    }

}

export class OciSecretClient {
    static new(): OciSecret {
        return OciSecret.newResource()
    }
    static clone(resource: OciSecret): OciSecret {
        return OciSecret.cloneResource(resource)
    }
}

export default OciSecretClient
