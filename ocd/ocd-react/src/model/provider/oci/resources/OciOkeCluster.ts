/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciOkeCluster"

export interface OciOkeCluster extends AutoGenerated.OciOkeCluster {}

export interface OciEndpointConfig extends AutoGenerated.OciEndpointConfig {}

export interface OciImagePolicyConfig extends AutoGenerated.OciImagePolicyConfig {}

export interface OciKeyDetails extends AutoGenerated.OciKeyDetails {}

export interface OciOptions extends AutoGenerated.OciOptions {}

export interface OciAddOns extends AutoGenerated.OciAddOns {}

export interface OciAdmissionControllerOptions extends AutoGenerated.OciAdmissionControllerOptions {}

export interface OciKubernetesNetworkConfig extends AutoGenerated.OciKubernetesNetworkConfig {}

export namespace OciOkeCluster {
    export function newResource(type?: string): OciOkeCluster {
        return {
            ...AutoGenerated.OciOkeCluster.newResource('oke_cluster'),
        }
    }
    export function cloneResource(resource: OciOkeCluster, type?: string): OciOkeCluster {
        return AutoGenerated.OciOkeCluster.cloneResource(resource, 'oke_cluster') as OciOkeCluster
    }
    export function getParentId(resource: OciOkeCluster): string {
        console.debug('OciOkeCluster: Getting Parent Id to for', resource.displayName, resource.id)
        return resource.compartmentId
    }
    export function setParentId(resource: OciOkeCluster, parentId: string): OciOkeCluster {
        console.debug('OciOkeCluster: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        return resource
    }
    export function getConnectionIds(resource: OciOkeCluster): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        console.debug('OciOkeCluster: Getting Connection Ids to for', resource.displayName, resource.id)
        return []
    }
    
    export function newOciEndpointConfig(): OciEndpointConfig {
        return {
            ...AutoGenerated.OciOkeCluster.newOciEndpointConfig(),
        }
    }

    export function newOciImagePolicyConfig(): OciImagePolicyConfig {
        return {
            ...AutoGenerated.OciOkeCluster.newOciImagePolicyConfig(),
        }
    }

    export function newOciKeyDetails(): OciKeyDetails {
        return {
            ...AutoGenerated.OciOkeCluster.newOciKeyDetails(),
        }
    }

    export function newOciOptions(): OciOptions {
        return {
            ...AutoGenerated.OciOkeCluster.newOciOptions(),
        }
    }

    export function newOciAddOns(): OciAddOns {
        return {
            ...AutoGenerated.OciOkeCluster.newOciAddOns(),
        }
    }

    export function newOciAdmissionControllerOptions(): OciAdmissionControllerOptions {
        return {
            ...AutoGenerated.OciOkeCluster.newOciAdmissionControllerOptions(),
        }
    }

    export function newOciKubernetesNetworkConfig(): OciKubernetesNetworkConfig {
        return {
            ...AutoGenerated.OciOkeCluster.newOciKubernetesNetworkConfig(),
        }
    }

}

export class OciOkeClusterClient {
    static new(): OciOkeCluster {
        return OciOkeCluster.newResource()
    }
    static clone(resource: OciOkeCluster): OciOkeCluster {
        return OciOkeCluster.cloneResource(resource)
    }
}

export default OciOkeClusterClient
