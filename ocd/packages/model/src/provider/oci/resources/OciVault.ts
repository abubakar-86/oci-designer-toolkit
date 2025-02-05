/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/OciVault"

export interface OciVault extends AutoGenerated.OciVault {}

export namespace OciVault {
    
    export function newResource(type?: string): OciVault {
        const resource = {
            ...AutoGenerated.OciVault.newResource('vault'),
        }
        return resource
    }
    export function cloneResource(resource: OciVault, type?: string): OciVault {
        return AutoGenerated.OciVault.cloneResource(resource, 'vault') as OciVault
    }
    export function allowedParentTypes(): string[] {
        return []
    }
    export function getParentId(resource: OciVault): string {
        const parentId = resource.compartmentId
        return parentId
    }
    export function setParentId(resource: OciVault, parentId: string): OciVault {
        return resource
    }
    export function getConnectionIds(resource: OciVault, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        let associationIds: string[] = []
        return associationIds
    }
}

export class OciVaultClient extends AutoGenerated.OciVaultClient {
    static new(): OciVault {
        return OciVault.newResource()
    }
    static clone(resource: OciVault): OciVault {
        return OciVault.cloneResource(resource)
    }
}

export default OciVaultClient
