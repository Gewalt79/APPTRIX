import PGPool from '../db_pool/pg_pool';

class Helper {
  public static shallowCopy(source: any, target: any) {
    Object.keys(target).forEach((key) => {
      if (source[key] !== undefined) {
        target[key] = source[key];
      }
    });

    return target;
  }

  public static geoDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3, π = Math.PI;
    const { sin, cos, atan2 } = Math;
    const φ1 = lat1 * π / 180, λ1 = lon1 * π / 180;
    const φ2 = lat2 * π / 180, λ2 = lon2 * π / 180;
    const Δφ = φ2 - φ1,        Δλ = λ2 - λ1;

    const a = sin(Δφ/2)**2 + cos(φ1) * cos(φ2) * sin(Δλ/2)**2;
    const c = 2 * atan2(a**.5, (1-a)**.5);
    const distance = R * c;

    return parseInt(distance.toFixed());
  };
} 

export default Helper;
