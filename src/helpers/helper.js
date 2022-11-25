"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    static shallowCopy(source, target) {
        Object.keys(target).forEach((key) => {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        });
        return target;
    }
    static geoDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3, π = Math.PI;
        const { sin, cos, atan2 } = Math;
        const φ1 = lat1 * π / 180, λ1 = lon1 * π / 180;
        const φ2 = lat2 * π / 180, λ2 = lon2 * π / 180;
        const Δφ = φ2 - φ1, Δλ = λ2 - λ1;
        const a = Math.pow(sin(Δφ / 2), 2) + cos(φ1) * cos(φ2) * Math.pow(sin(Δλ / 2), 2);
        const c = 2 * atan2(Math.pow(a, .5), Math.pow((1 - a), .5));
        const distance = R * c;
        return parseInt(distance.toFixed());
    }
    ;
}
exports.default = Helper;
