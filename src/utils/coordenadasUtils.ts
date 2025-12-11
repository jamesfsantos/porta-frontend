

import type CoordenadaModel from "@/models/coordenadaModel"


function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}


export function getDistanceFromLatLonInKm(position1: CoordenadaModel, position2: CoordenadaModel): number {
  const R = 6371;
  const dLat = deg2rad(position2.latitude - position1.latitude);
  const dLng = deg2rad(position2.longitude - position1.longitude);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(position1.latitude)) *
    Math.cos(deg2rad(position1.latitude)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return parseFloat((R * c * 1000).toFixed())
}
