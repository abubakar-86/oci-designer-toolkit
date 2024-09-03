/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/AzureLoadBalancer"

export interface AzureLoadBalancer extends AutoGenerated.AzureLoadBalancer {}

export namespace AzureLoadBalancer {
    
    export function newResource(type?: string): AzureLoadBalancer {
        const resource = {
            ...AutoGenerated.AzureLoadBalancer.newResource('load_balancer'),
        }
        return resource
    }
    export function cloneResource(resource: AzureLoadBalancer, type?: string): AzureLoadBalancer {
        return AutoGenerated.AzureLoadBalancer.cloneResource(resource, 'load_balancer') as AzureLoadBalancer
    }
    export function allowedParentTypes(): string[] {
        return []
    }
    export function getParentId(resource: AzureLoadBalancer): string {
        const parentId = resource.compartmentId
        return parentId
    }
    export function setParentId(resource: AzureLoadBalancer, parentId: string): AzureLoadBalancer {
        return resource
    }
    export function getConnectionIds(resource: AzureLoadBalancer, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        let associationIds: string[] = []
        return associationIds
    }
}

export class AzureLoadBalancerClient extends AutoGenerated.AzureLoadBalancerClient {
    static new(): AzureLoadBalancer {
        return AzureLoadBalancer.newResource()
    }
    static clone(resource: AzureLoadBalancer): AzureLoadBalancer {
        return AzureLoadBalancer.cloneResource(resource)
    }
}

export default AzureLoadBalancerClient
