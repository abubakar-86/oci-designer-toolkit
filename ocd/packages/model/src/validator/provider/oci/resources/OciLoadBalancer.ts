/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from './generated/OciLoadBalancer'
import * as Model from '../../../../provider/oci/resources'
import { OcdResources, OciResources } from '../../../../OcdDesign'
import { OcdResourceValidator, OcdValidationResult, OcdValidatorResource } from '../../../OcdResourceValidator'

export namespace OciLoadBalancer {
    export function validateResource(resource: Model.OciLoadBalancer, resources: OciResources): OcdValidationResult[] {
        return [...AutoGenerated.OciLoadBalancer.validateResource(resource, resources), ...customValidation(resource, resources)]
    }
    export function isResourceValid(resource: Model.OciLoadBalancer, resources: OciResources): boolean {
        return (validateResource(resource, resources).filter((v: OcdValidationResult) => !v.valid).length > 0)
    }
    export function hasErrors(resource: Model.OciLoadBalancer, resources: OciResources): boolean {
        return (validateResource(resource, resources).filter((v: OcdValidationResult) => v.type === 'error').length > 0)
    }
    export function hasWarnings(resource: Model.OciLoadBalancer, resources: OciResources): boolean {
        return (validateResource(resource, resources).filter((v: OcdValidationResult) => v.type === 'warning').length > 0)
    }
    export function hasInformation(resource: Model.OciLoadBalancer, resources: OciResources): boolean {
        return (validateResource(resource, resources).filter((v: OcdValidationResult) => v.type === 'information').length > 0)
    }
    function customValidation(resource: Model.OciLoadBalancer, resources: OciResources): OcdValidationResult[] {
        const results: OcdValidationResult[] = [
            ...shapeDetailsMaximumBandwidthInMbps(resource, resources)
        ]
        return results
    }
    const shape = (resource: OcdValidatorResource, resources: OciResources): OcdValidationResult[] => {return resource.shape !== 'flexible' && resource.shape !== '10Mbps-Micro' ? [
        {
            valid: false,
            type: 'warning',
            message: 'Deprecated Shape selected.',
            element: 'shape',
            title: resource.shape,
            displayName: resource.displayName,
            class: 'oci-load-balancer'
        }
    ] : []}
    const shapeDetailsMaximumBandwidthInMbps = (resource: OcdValidatorResource, resources: OciResources): OcdValidationResult[] => {return resource.shape === 'flexible' && resource.shapeDetails && resource.shapeDetails.minimumBandwithInMbps > resource.shapeDetails.maximumBandwithInMbps ? [
        {
            valid: false,
            type: 'error',
            message: 'Maximum Bandwidth must be less than Minimum Bandwidth.',
            element: 'shape_details.maximum_bandwidth_in_mbps',
            title: resource.shape_details.maximum_bandwidth_in_mbps,
            displayName: resource.displayName,
            class: 'oci-load-balancer'
        }
    ] : []}
}
