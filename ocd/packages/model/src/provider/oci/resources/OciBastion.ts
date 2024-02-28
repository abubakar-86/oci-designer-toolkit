/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/OciBastion"

export interface OciBastion extends AutoGenerated.OciBastion {}

export namespace OciBastion {
    
    export function newResource(type?: string): OciBastion {
        return {
            ...AutoGenerated.OciBastion.newResource('bastion'),
        }
    }
    export function cloneResource(resource: OciBastion, type?: string): OciBastion {
        return AutoGenerated.OciBastion.cloneResource(resource, 'bastion') as OciBastion
    }
    export function allowedParentTypes(): string[] {
        // console.debug('OciBastion: Allowed Parent Types')
        return []
    }
    export function getParentId(resource: OciBastion): string {
        // console.debug('OciBastion: Getting Parent Id to for', resource.displayName, resource.id)
        return resource.compartmentId
    }
    export function setParentId(resource: OciBastion, parentId: string): OciBastion {
        // console.debug('OciBastion: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        return resource
    }
    export function getConnectionIds(resource: OciBastion, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        // console.debug('OciBastion: Getting Connection Ids to for', resource.displayName, resource.id)
        return []
    }
    
}

export class OciBastionClient {
    static new(): OciBastion {
        return OciBastion.newResource()
    }
    static clone(resource: OciBastion): OciBastion {
        return OciBastion.cloneResource(resource)
    }
}

export default OciBastionClient
