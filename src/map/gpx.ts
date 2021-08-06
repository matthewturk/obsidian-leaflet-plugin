import type { LeafletMap } from "src/@types";
import { LeafletSymbol } from "src/utils/leaflet-import";

import type { GPX as LeafletGPX, GPXOptions } from "leaflet";

let L = window[LeafletSymbol];
const MarkerOptions: L.MarkerOptions = {
    startIconUrl: null,
    endIconUrl: null,
    shadowUrl: null,
    wptIconUrls: {
        "": null
    },
    startIcon: null,
    endIcon: null,
    wptIcons: {
        "": null
    }
};

export class GPX {
    leafletInstance: LeafletGPX;
    constructor(
        private map: LeafletMap,
        gpx: string,
        options: GPXOptions,
        private icons: any
    ) {
        if (this.icons.start && this.map.markerIcons.has(this.icons.start)) {
            MarkerOptions.startIcon = this.map.markerIcons.get(
                this.icons.start
            ).icon;
        }
        if (this.icons.end && this.map.markerIcons.has(this.icons.end)) {
            MarkerOptions.endIcon = this.map.markerIcons.get(
                this.icons.end
            ).icon;
        }
        if (
            this.icons.waypoint &&
            this.map.markerIcons.has(this.icons.waypoint)
        ) {
            MarkerOptions.wptIcons = {
                "": this.map.markerIcons.get(this.icons.waypoint).icon
            };
        }

        this.leafletInstance = new L.GPX(gpx, {
            marker_options: MarkerOptions
        });
    }
}
