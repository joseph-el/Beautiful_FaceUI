/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   camera.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: yoel-idr <yoel-idr@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/01 18:21:57 by yoel-idr          #+#    #+#             */
/*   Updated: 2023/01/03 18:24:56 by yoel-idr         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export class CameraInfoPosition {
    constructor(app) {
        this.app = app;

        this.direction = null;
        this.initialValue = true;
    }

    monitor(){
        return new Promise(resolve => {
            CI.captureDevicePosition.monitor({fireOnInitialValue: true}).subscribe(e => {
                if(e.newValue == 'FRONT'){
                    this.direction = 'front';
                    if(!this.initialValue){
                        this.app.front();
                    }
        
                }else{
                    this.direction = 'back';
                    if(!this.initialValue){
                        this.app.back();
                    }
        
                }
                this.initialValue = false;
                resolve();
            });
        });

    }
}
