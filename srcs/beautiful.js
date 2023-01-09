/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   beautiful.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: yoel-idr <yoel-idr@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 18:15:22 by yoel-idr          #+#    #+#             */
/*   Updated: 2023/01/09 18:25:02 by yoel-idr         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Simple1DNoise from './noise1d'

const beaty = new Simple1DNoise()
const MersenneTwister = require('mersenne-twister')
const mg = new MersenneTwister()

const Materials = require('Materials')
const Textures = require('Textures')
const Patches = require('Patches')
const Time = require('Time')
const Shaders = require('Shaders')
const CameraInfo = require('CameraInfo')
const R = require('Reactive')
const console = require('Diagnostics')


const faceCameraMaterial = Materials.get('faceCameraMaterial')

const cameraColor = Textures.get('cameraTexture').signal

const uv = Shaders.fragmentStage(Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS }))
const time = Patches.getScalarValue('time')

const res = R.pack2(CameraInfo.previewSize.width, CameraInfo.previewSize.height)

const pixelSize = R.pack2(
  R.sin(time).mul(10 * beaty.getValue(mg.random())).add(10),
  R.cos(time).mul(10 * beaty.getValue(mg.random())).add(10)
)
const tileX = R.div(pixelSize.x, res.x)
const tileY = R.div(pixelSize.y, res.y)
const newUV = R.pack2(tileX.mul(R.floor(R.div(uv.x, tileX))), tileY.mul(R.floor(R.div(uv.y, tileY))))

const finalColor = Shaders.textureSampler(cameraColor, newUV )

faceCameraMaterial.setTexture(finalColor, { textureSlotName: Shaders.DefaultMaterialTextures.DIFFUSE })