/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   face.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: yoel-idr <yoel-idr@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 18:20:49 by yoel-idr          #+#    #+#             */
/*   Updated: 2023/01/09 18:20:54 by yoel-idr         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const D = require('Diagnostics');
const FT = require('FaceTracking');
const R = require('Reactive');


export class Face {
    constructor(app) {
        this.app = app;

        const face = FT.face(0);
        this.app.assets['faceTrackerObjects'].hidden = R.not(face.isTracked);

    }

    show(){
        this.app.assets['faceTrackerContainer'].hidden = false;

    }

    hide(){
        this.app.assets['faceTrackerContainer'].hidden = true;

    }
    
}