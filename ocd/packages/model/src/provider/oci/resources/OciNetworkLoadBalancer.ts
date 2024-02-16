/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/OciNetworkLoadBalancer"

export interface OciNetworkLoadBalancer extends AutoGenerated.OciNetworkLoadBalancer {}

export interface OciReservedIps extends AutoGenerated.OciReservedIps {}

export namespace OciNetworkLoadBalancer {
    
    export interface OciReservedIps extends AutoGenerated.OciNetworkLoadBalancer.OciReservedIps {}

    export function newResource(type?: string): OciNetworkLoadBalancer {
        return {
            ...AutoGenerated.OciNetworkLoadBalancer.newResource('network_load_balancer'),
        }
    }
    export function cloneResource(resource: OciNetworkLoadBalancer, type?: string): OciNetworkLoadBalancer {
        return AutoGenerated.OciNetworkLoadBalancer.cloneResource(resource, 'network_load_balancer') as OciNetworkLoadBalancer
    }
    export function allowedParentTypes(): string[] {
        console.debug('OciNetworkLoadBalancer: Allowed Parent Types')
        return ['Subnet']
    }
    export function getParentId(resource: OciNetworkLoadBalancer): string {
        console.debug('OciNetworkLoadBalancer: Getting Parent Id to for', resource.displayName, resource.id)
        let parentId = resource.subnetId !== '' ? resource.subnetId as string  : resource.compartmentId as string
        return parentId
    }
    export function setParentId(resource: OciNetworkLoadBalancer, parentId: string): OciNetworkLoadBalancer {
        console.debug('OciNetworkLoadBalancer: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        resource.subnetId = parentId
        return resource
    }
    export function getConnectionIds(resource: OciNetworkLoadBalancer, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        console.debug('OciNetworkLoadBalancer: Getting Connection Ids to for', resource.displayName, resource.id)
        return []
    }
    
    export function newOciReservedIps(): OciReservedIps {
        return {
            ...AutoGenerated.OciNetworkLoadBalancer.newOciReservedIps(),
        }
    }

}

export class OciNetworkLoadBalancerClient {
    static new(): OciNetworkLoadBalancer {
        return OciNetworkLoadBalancer.newResource()
    }
    static clone(resource: OciNetworkLoadBalancer): OciNetworkLoadBalancer {
        return OciNetworkLoadBalancer.cloneResource(resource)
    }
}

export default OciNetworkLoadBalancerClient
