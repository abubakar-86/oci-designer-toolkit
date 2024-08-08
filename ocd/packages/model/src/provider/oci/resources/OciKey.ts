/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/OciKey"

export interface OciKey extends AutoGenerated.OciKey {}

export namespace OciKey {
    export namespace KeyShape {
        export interface KeyShape extends AutoGenerated.OciKey.KeyShape.KeyShape {}
        export function newKeyShape(): KeyShape {return AutoGenerated.OciKey.KeyShape.newKeyShape()}
        
    }
    export function newResource(type?: string): OciKey {
        const resource = {
            ...AutoGenerated.OciKey.newResource('key'),
        }
        return resource
    }
    export function cloneResource(resource: OciKey, type?: string): OciKey {
        return AutoGenerated.OciKey.cloneResource(resource, 'key') as OciKey
    }
    export function allowedParentTypes(): string[] {
        return []
    }
    export function getParentId(resource: OciKey): string {
        const parentId = resource.compartmentId
        return parentId
    }
    export function setParentId(resource: OciKey, parentId: string): OciKey {
        return resource
    }
    export function getConnectionIds(resource: OciKey, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        let associationIds: string[] = []
        return associationIds
    }
}

export class OciKeyClient extends AutoGenerated.OciKeyClient {
    static new(): OciKey {
        return OciKey.newResource()
    }
    static clone(resource: OciKey): OciKey {
        return OciKey.cloneResource(resource)
    }
}

export default OciKeyClient
