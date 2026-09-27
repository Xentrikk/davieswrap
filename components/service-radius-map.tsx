'use client';

import { useEffect, useRef } from 'react';
import { BorderGlow } from './border-glow';
import { Eyebrow } from './site-shell';

const BURSLEDON: [number, number] = [50.878, -1.303];
const RADIUS_METRES = 25 * 1609.344;

export function ServiceRadiusMap() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let destroy: (() => void) | undefined;

    void import('leaflet').then((L) => {
      if (disposed || !container.current) return;

      const map = L.map(container.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView(BURSLEDON, 7);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const radius = L.circle(BURSLEDON, {
        radius: RADIUS_METRES,
        color: '#ff5a00',
        weight: 2,
        opacity: 0.9,
        fillColor: '#ff5a00',
        fillOpacity: 0.12,
        dashArray: '8 9',
      }).addTo(map);

      const marker = L.divIcon({
        className: 'radius-map-marker-shell',
        html: '<span class="radius-map-marker"><i></i></span>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker(BURSLEDON, { icon: marker })
        .addTo(map)
        .bindTooltip('Davies / Bursledon', { permanent: true, direction: 'top', offset: [0, -17] });

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      map.fitBounds(radius.getBounds(), { padding: [28, 28] });
      destroy = () => map.remove();
    });

    return () => {
      disposed = true;
      destroy?.();
    };
  }, []);

  return (
    <section className="radius-section section-pad" aria-labelledby="radius-title">
      <div className="radius-copy">
        <Eyebrow>Based in Bursledon / SO31</Eyebrow>
        <h2 id="radius-title">25 MILES.<br/><em>LOCAL BASE.</em></h2>
        <p>Based in Bursledon, Southampton. Travel is charged only when a project falls outside the standard 25-mile local radius.</p>
        <div className="radius-specs"><span><b>25</b> mile local radius</span><span><b>45p</b> per mile beyond 25 miles</span></div>
      </div>
      <BorderGlow className="radius-map-glow"><div className="radius-map-shell">
        <div ref={container} className="radius-map" aria-label="Interactive map showing a 25-mile service radius from Bursledon" />
        <div className="radius-map-hud" aria-hidden="true"><span>50.878° N</span><b>DAVIES / 25-MILE RADIUS</b><span>1.303° W</span></div>
      </div></BorderGlow>
    </section>
  );
}
