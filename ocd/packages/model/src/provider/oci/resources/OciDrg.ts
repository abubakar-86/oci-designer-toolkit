/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/OciDrg"

export interface OciDrg extends AutoGenerated.OciDrg {}

export namespace OciDrg {
    
    export function newResource(type?: string): OciDrg {
        const resource = {
            ...AutoGenerated.OciDrg.newResource('drg'),
        }
        return resource
    }
    export function cloneResource(resource: OciDrg, type?: string): OciDrg {
        return AutoGenerated.OciDrg.cloneResource(resource, 'drg') as OciDrg
    }
    export function allowedParentTypes(): string[] {
        return []
    }
    export function getParentId(resource: OciDrg): string {
        const parentId = resource.compartmentId
        return parentId
    }
    export function setParentId(resource: OciDrg, parentId: string): OciDrg {
        return resource
    }
    export function getConnectionIds(resource: OciDrg, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        let associationIds: string[] = []
        return associationIds
    }
}

export class OciDrgClient extends AutoGenerated.OciDrgClient {
    static new(): OciDrg {
        return OciDrg.newResource()
    }
    static clone(resource: OciDrg): OciDrg {
        return OciDrg.cloneResource(resource)
    }
}

export default OciDrgClient
