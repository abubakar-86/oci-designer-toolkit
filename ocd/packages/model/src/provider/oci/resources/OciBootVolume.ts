/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/OciBootVolume"

export interface OciBootVolume extends AutoGenerated.OciBootVolume {}

export namespace OciBootVolume {
    export namespace AutotunePolicies {
        export interface AutotunePolicies extends AutoGenerated.OciBootVolume.AutotunePolicies.AutotunePolicies {}
        export function newAutotunePolicies(): AutotunePolicies {return AutoGenerated.OciBootVolume.AutotunePolicies.newAutotunePolicies()}
        
    }
    export namespace BootVolumeReplicas {
        export interface BootVolumeReplicas extends AutoGenerated.OciBootVolume.BootVolumeReplicas.BootVolumeReplicas {}
        export function newBootVolumeReplicas(): BootVolumeReplicas {return AutoGenerated.OciBootVolume.BootVolumeReplicas.newBootVolumeReplicas()}
        
    }
    export namespace SourceDetails {
        export interface SourceDetails extends AutoGenerated.OciBootVolume.SourceDetails.SourceDetails {}
        export function newSourceDetails(): SourceDetails {return AutoGenerated.OciBootVolume.SourceDetails.newSourceDetails()}
        
    }
    export function newResource(type?: string): OciBootVolume {
        const resource = {
            ...AutoGenerated.OciBootVolume.newResource('boot_volume'),
        }
        return resource
    }
    export function cloneResource(resource: OciBootVolume, type?: string): OciBootVolume {
        return AutoGenerated.OciBootVolume.cloneResource(resource, 'boot_volume') as OciBootVolume
    }
    export function allowedParentTypes(): string[] {
        return []
    }
    export function getParentId(resource: OciBootVolume): string {
        const parentId = resource.compartmentId
        return parentId
    }
    export function setParentId(resource: OciBootVolume, parentId: string): OciBootVolume {
        return resource
    }
    export function getConnectionIds(resource: OciBootVolume, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        let associationIds: string[] = []
        return associationIds
    }
}

export class OciBootVolumeClient extends AutoGenerated.OciBootVolumeClient {
    static new(): OciBootVolume {
        return OciBootVolume.newResource()
    }
    static clone(resource: OciBootVolume): OciBootVolume {
        return OciBootVolume.cloneResource(resource)
    }
}

export default OciBootVolumeClient
