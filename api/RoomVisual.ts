/**
 * <img align="right" src="img/visual.png">
 *
 * Room visuals provide a way to show various visual debug info in game rooms. You can use the <code>RoomVisual</code> object to draw simple shapes that are visible only to you. Every existing <code>Room</code> object already contains the {@link Room.visual visual`} property, but you also can create new <code>RoomVisual</code> objects for any room (even without visibility) using the {@link RoomVisual.constructor constructor}.
 *
 * Room visuals are not stored in the database, their only purpose is to display something in your browser. All drawings will persist for one tick and will disappear if not updated. All <code>RoomVisual</code> API calls have no added CPU cost (their cost is natural and mostly related to simple <code>JSON.serialize</code> calls). However, there is a usage limit: you cannot post more than 500 KB of serialized data per one room (see {@link RoomVisual.getSize getSize`} method).
 *
 * All draw coordinates are measured in game coordinates and centered to tile centers, i.e. (10,10) will point to the center of the creep at <code>x:10; y:10</code> position. Fractional coordinates are allowed.
 */
class RoomVisual {
    /**
     * You can directly create new <code>RoomVisual</code> object in any room, even if it's invisible to your script.
     *
     * This method has insignificant CPU cost.
     *
     * @param {string} roomName (optional) The room name. If undefined, visuals will be posted to all rooms simultaneously.
     *
     * @example
     * Game.rooms['W10N10'].visual.circle(10,20).line(0,0,10,20);
     * // the same as:
     * new RoomVisual('W10N10').circle(10,20).line(0,0,10,20);
     *
     * @example
     * // this text will be displayed in all rooms
     * new RoomVisual().text('Some text', 1, 1, {align: 'left'});
     */
    constructor(roomName?: string) {
    }

    /**
     * The name of the room.
     */
    roomName: string;

    /**
     * Draw a line.
     *
     * This method has insignificant CPU cost.
     *
     * @param {number} x1 The start X coordinate.
     * @param {number} y1 The start Y coordinate.
     * @param {number} x2 The finish X coordinate.
     * @param {number} y2 The finish Y coordinate.
     * @param {object} style (optional) An object with the following properties:
     * <ul>
     *     <li>
     *         <div class="api-arg-title">width</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Line width, default is 0.1.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">color</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Line color in any web format, default is <code>#ffffff</code> (white).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">opacity</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Opacity value, default is 0.5.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">lineStyle</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
     *     </li>
     * </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * new RoomVisual('W1N1').line(10,15, 20,20);
     *
     * @example
     * creep.room.visual.line(creep.pos, target.pos,
     *     {color: 'red', style: 'dashed'});
     */
    line(x1: number, y1: number, x2: number, y2: number, style?: {
        /**
         * Line width, default is 0.1.
         * @default 0.1
         */
        width?: number,

        /**
         * Line color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        color?: string,

        /**
         * Opacity value, default is 0.5.
         * @default 0.5
         */
        opacity?: number,

        /**
         * Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.
         * @default undefined
         */
        lineStyle?: string,
    }): RoomVisual {
        return this;
    }

    /**
     * Draw a line.
     *
     * This method has insignificant CPU cost.
     *
     * @param {RoomPosition} pos1 The start position object.
     * @param {RoomPosition} pos2 The finish position object.
     * @param {object} style (optional) An object with the following properties:
     * <ul>
     *     <li>
     *         <div class="api-arg-title">width</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Line width, default is 0.1.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">color</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Line color in any web format, default is <code>#ffffff</code> (white).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">opacity</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Opacity value, default is 0.5.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">lineStyle</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
     *     </li>
     * </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * new RoomVisual('W1N1').line(10,15, 20,20);
     *
     * @example
     * creep.room.visual.line(creep.pos, target.pos,
     *     {color: 'red', style: 'dashed'});
     */
    line(number, pos1: RoomPosition, pos2: RoomPosition, style?: {
        /**
         * Line width, default is 0.1.
         * @default 0.1
         */
        width?: number,

        /**
         * Line color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        color?: string,

        /**
         * Opacity value, default is 0.5.
         * @default 0.5
         */
        opacity?: number,

        /**
         * Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.
         * @default undefined
         */
        lineStyle?: string,
    }): RoomVisual {
        return this;
    }

    /**
     * Draw a circle.
     *
     * This method has insignificant CPU cost.
     *
     * @param {number} x The X coordinate of the center.
     * @param {number} y The Y coordinate of the center.
     * @param {object} style (optional) An object with the following properties:
     * <ul>
     *     <li>
     *         <div class="api-arg-title">radius</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Circle radius, default is 0.15.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">fill</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Fill color in any web format, default is <code>#ffffff</code> (white).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">opacity</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Opacity value, default is 0.5.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">stroke</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">strokeWidth</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Stroke line width, default is 0.1.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">lineStyle</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
     *     </li>
     * </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * new RoomVisual('W1N1').circle(10,15);
     *
     * @example
     * creep.room.visual.circle(creep.pos,
     *     {fill: 'transparent', radius: 0.55, stroke: 'red'});
     */
    circle(x: number, y: number, style?: {
        /**
         * Circle radius, default is 0.15.
         * @default 0.15
         */
        radius?: number,

        /**
         * Fill color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        fill?: string,

        /**
         * Opacity value, default is 0.5.
         * @default 0.5
         */
        opacity?: number,

        /**
         * Stroke color in any web format, default is undefined (no stroke).
         * @default undefined
         */
        stroke?: string,

        /**
         * Stroke line width, default is 0.1.
         * @default 0.1
         */
        strokeWidth?: number,

        /**
         * Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.
         * @default undefined
         */
        lineStyle?: string,
    }): RoomVisual {
        return this;
    }

    /**
     * Draw a circle.
     *
     * This method has insignificant CPU cost.
     *
     * @param {RoomPosition} pos The position object of the center.
     * @param {object} style (optional) An object with the following properties:
     * <ul>
     *     <li>
     *         <div class="api-arg-title">radius</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Circle radius, default is 0.15.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">fill</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Fill color in any web format, default is <code>#ffffff</code> (white).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">opacity</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Opacity value, default is 0.5.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">stroke</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">strokeWidth</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Stroke line width, default is 0.1.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">lineStyle</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
     *     </li>
     * </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * new RoomVisual('W1N1').circle(10,15);
     *
     * @example
     * creep.room.visual.circle(creep.pos,
     *     {fill: 'transparent', radius: 0.55, stroke: 'red'});
     */
    circle(pos: RoomPosition, style?: {
        /**
         * Circle radius, default is 0.15.
         * @default 0.15
         */
        radius?: number,

        /**
         * Fill color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        fill?: string,

        /**
         * Opacity value, default is 0.5.
         * @default 0.5
         */
        opacity?: number,

        /**
         * Stroke color in any web format, default is undefined (no stroke).
         * @default undefined
         */
        stroke?: string,

        /**
         * Stroke line width, default is 0.1.
         * @default 0.1
         */
        strokeWidth?: number,

        /**
         * Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.
         * @default undefined
         */
        lineStyle?: string,
    }): RoomVisual {
        return this;
    }

    /**
     * Draw a rectangle.
     *
     * This method has insignificant CPU cost.
     *
     * @param {number} x The X coordinate of the top-left corner.
     * @param {number} y The Y coordinate of the top-left corner.
     * @param {number} width The width of the rectangle.
     * @param {number} height The height of the rectangle.
     * @param {object} style (optional) An object with the following properties:
     * <ul>
     *     <li>
     *         <div class="api-arg-title">fill</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Fill color in any web format, default is <code>#ffffff</code> (white).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">opacity</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Opacity value, default is 0.5.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">stroke</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">strokeWidth</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Stroke line width, default is 0.1.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">lineStyle</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
     *     </li>
     * </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * // 9x9 area from (2,2) to (10,10)
     * new RoomVisual('W1N1').rect(1.5, 1.5, 9, 9);
     *
     * @example
     * // a rectangle border on creep
     * creep.room.visual.rect(creep.pos.x - 0.6, creep.pos.y - 0.6,
     *     1.2, 1.2,
     *     {fill: 'transparent', stroke: '#f00'});
     */
    rect(x: number, y: number, width: number, height: number, style?: {
        /**
         * Fill color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        fill?: string,

        /**
         * Opacity value, default is 0.5.
         * @default 0.5
         */
        opacity?: number,

        /**
         * Stroke color in any web format, default is undefined (no stroke).
         * @default undefined
         */
        stroke?: string,

        /**
         * Stroke line width, default is 0.1.
         * @default 0.1
         */
        strokeWidth?: number,

        /**
         * Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.
         * @default undefined
         */
        lineStyle?: string,

    }): RoomVisual {
        return this;
    }

    /**
     * Draw a rectangle.
     *
     * This method has insignificant CPU cost.
     *
     * @param {RoomPosition} topLeftPos The position object of the top-left corner.
     * @param {number} width The width of the rectangle.
     * @param {number} height The height of the rectangle.
     * @param {object} style (optional) An object with the following properties:
     * <ul>
     *     <li>
     *         <div class="api-arg-title">fill</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Fill color in any web format, default is <code>#ffffff</code> (white).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">opacity</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Opacity value, default is 0.5.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">stroke</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">strokeWidth</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Stroke line width, default is 0.1.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">lineStyle</div>
     *         <div class="api-arg-type">string</div>
     *         <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
     *     </li>
     * </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * // 9x9 area from (2,2) to (10,10)
     * new RoomVisual('W1N1').rect(1.5, 1.5, 9, 9);
     *
     * @example
     * // a rectangle border on creep
     * creep.room.visual.rect(creep.pos.x - 0.6, creep.pos.y - 0.6,
     *     1.2, 1.2,
     *     {fill: 'transparent', stroke: '#f00'});
     */
    rect(topLeftPos: RoomPosition, width: number, height: number, style?: {
        /**
         * Fill color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        fill?: string,

        /**
         * Opacity value, default is 0.5.
         * @default 0.5
         */
        opacity?: number,

        /**
         * Stroke color in any web format, default is undefined (no stroke).
         * @default undefined
         */
        stroke?: string,

        /**
         * Stroke line width, default is 0.1.
         * @default 0.1
         */
        strokeWidth?: number,

        /**
         * Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.
         * @default undefined
         */
        lineStyle?: string,

    }): RoomVisual {
        return this;
    }

    /**
     * Draw a polyline.
     *
     * This method has insignificant CPU cost.
     *
     * @param {Array} points An array of points. Every item should be either an array with 2 numbers (i.e. <code>[10,15]</code>), or a {@link RoomPosition} object.
     * @param {object} style (optional) An object with the following properties:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">fill</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Fill color in any web format, default is <code>undefined</code> (no fill).</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">opacity</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Opacity value, default is 0.5.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">stroke</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Stroke color in any web format, default is <code>#ffffff</code> (white).</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">strokeWidth</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Stroke line width, default is 0.1.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">lineStyle</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
     *                        </li>
     *                    </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * const points = [];
     * points.push(creep1.pos);
     * points.push([10,15]);
     * points.push(new RoomPosition(20,21,'W1N1'));
     * new RoomVisual('W1N1').poly(points, {fill: 'aqua'});
     *
     * @example
     * // visualize the path
     * const path = Game.rooms['W1N1'].findPath(from, to);
     * new RoomVisual('W1N1').poly(path, {stroke: '#fff', strokeWidth: .15,
	 * 	opacity: .2, lineStyle: 'dashed'});
     */
    poly(points: Array<[number, number] | RoomPosition>, style?: {
        /**
         * Fill color in any web format, default is <code>undefined</code> (no fill).
         * @default undefined
         */
        fill?: string,

        /**
         * Opacity value, default is 0.5.
         * @default 0.5
         */
        opacity?: number,

        /**
         * Stroke color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        stroke?: string,

        /**
         * Stroke line width, default is 0.1.
         * @default 0.1
         */
        strokeWidth?: number,

        /**
         * Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.
         * @default undefined
         */
        lineStyle?: string,
    }): RoomVisual {
        return this;
    }

    /**
     * Draw a text label. You can use any valid Unicode characters, including {@link http://unicode.org/emoji/charts/emoji-style.txt emoji}.
     *
     * This method has insignificant CPU cost.
     *
     * @param {string} text The text message.
     * @param {number} x The X coordinate of the label baseline point.
     * @param {number} y The Y coordinate of the label baseline point.
     * @param {object} style (optional) An object with the following properties:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">color</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Font color in any web format, default is <code>#ffffff</code> (white).</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">font</div>
     *                            <div class="api-arg-type">number, string</div>
     *                            <div class="api-arg-desc">Either a number or a string in one of the following forms:
     *                                <ul>
     *                                    <li><code>0.7</code> - relative size in game coordinates</li>
     *                                    <li><code>20px</code> - absolute size in pixels</li>
     *                                    <li><code>0.7 serif</code></li>
     *                                    <li><code>bold italic 1.5 Times New Roman</code></li>
     *                                </ul>
     *                            </div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">stroke</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">strokeWidth</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Stroke width, default is 0.15.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">backgroundColor</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Background color in any web format, default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline).</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">backgroundPadding</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Background rectangle padding, default is 0.3.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">align</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Text align, either <code>center</code>, <code>left</code>, or <code>right</code>. Default is <code>center</code>.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">opacity</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Opacity value, default is 1.0.</div>
     *                        </li>
     *                    </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * new RoomVisual('W1N1').text("Target💥", 10, 15, {color: 'green', font: 0.8});
     */
    text(text: string, x: number, y: number, style?: {
        /**
         * Font color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        color?: string,

        /**
         * Either a number or a string in one of the following forms:
         * <ul>
         *     <li><code>0.7</code> - relative size in game coordinates</li>
         *     <li><code>20px</code> - absolute size in pixels</li>
         *     <li><code>0.7 serif</code></li>
         *     <li><code>bold italic 1.5 Times New Roman</code></li>
         * </ul>
         */
        font?: number, string,

        /**
         * Stroke color in any web format, default is undefined (no stroke).
         * @default undefined
         */
        stroke?: string,

        /**
         * Stroke width, default is 0.15.
         * @default 0.15
         */
        strokeWidth?: number,

        /**
         * Background color in any web format, default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline).
         * @default undefined
         */
        backgroundColor?: string,

        /**
         * Background rectangle padding, default is 0.3.
         * @default 0.3
         */
        backgroundPadding?: number,

        /**
         * Text align, either <code>center</code>, <code>left</code>, or <code>right</code>. Default is <code>center</code>.
         * @default center
         */
        align?: string,

        /**
         * Opacity value, default is 1.0.
         * @default 1.0
         */
        opacity?: number,
    }): RoomVisual {
        return this;
    }

    /**
     * Draw a text label. You can use any valid Unicode characters, including {@link http://unicode.org/emoji/charts/emoji-style.txt emoji}.
     *
     * This method has insignificant CPU cost.
     *
     * @param {string} text The text message.
     * @param {RoomPosition} pos The position object of the label baseline.
     * @param {object} style (optional) An object with the following properties:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">color</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Font color in any web format, default is <code>#ffffff</code> (white).</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">font</div>
     *                            <div class="api-arg-type">number, string</div>
     *                            <div class="api-arg-desc">Either a number or a string in one of the following forms:
     *                                <ul>
     *                                    <li><code>0.7</code> - relative size in game coordinates</li>
     *                                    <li><code>20px</code> - absolute size in pixels</li>
     *                                    <li><code>0.7 serif</code></li>
     *                                    <li><code>bold italic 1.5 Times New Roman</code></li>
     *                                </ul>
     *                            </div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">stroke</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">strokeWidth</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Stroke width, default is 0.15.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">backgroundColor</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Background color in any web format, default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline).</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">backgroundPadding</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Background rectangle padding, default is 0.3.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">align</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">Text align, either <code>center</code>, <code>left</code>, or <code>right</code>. Default is <code>center</code>.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">opacity</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Opacity value, default is 1.0.</div>
     *                        </li>
     *                    </ul>
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * new RoomVisual('W1N1').text("Target💥", 10, 15, {color: 'green', font: 0.8});
     */
    text(text: string, pos: RoomPosition, style?: {
        /**
         * Font color in any web format, default is <code>#ffffff</code> (white).
         * @default '#ffffff'
         */
        color?: string,

        /**
         * Either a number or a string in one of the following forms:
         * <ul>
         *     <li><code>0.7</code> - relative size in game coordinates</li>
         *     <li><code>20px</code> - absolute size in pixels</li>
         *     <li><code>0.7 serif</code></li>
         *     <li><code>bold italic 1.5 Times New Roman</code></li>
         * </ul>
         */
        font?: number, string,

        /**
         * Stroke color in any web format, default is undefined (no stroke).
         * @default undefined
         */
        stroke?: string,

        /**
         * Stroke width, default is 0.15.
         * @default 0.15
         */
        strokeWidth?: number,

        /**
         * Background color in any web format, default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline).
         * @default undefined
         */
        backgroundColor?: string,

        /**
         * Background rectangle padding, default is 0.3.
         * @default 0.3
         */
        backgroundPadding?: number,

        /**
         * Text align, either <code>center</code>, <code>left</code>, or <code>right</code>. Default is <code>center</code>.
         * @default center
         */
        align?: string,

        /**
         * Opacity value, default is 1.0.
         * @default 1.0
         */
        opacity?: number,
    }): RoomVisual {
        return this;
    }

    /**
     * Remove all visuals from the room.
     *
     * This method has insignificant CPU cost.
     *
     * @return {RoomVisual} The <code>RoomVisual</code> object itself, so that you can chain calls.
     *
     * @example
     * new RoomVisual('W1N1').clear();
     */
    clear(): RoomVisual {
        return this;
    }

    /**
     * Get the stored size of all visuals added in the room in the current tick. It must not exceed 512,000 (500 KB).
     *
     * This method has insignificant CPU cost.
     *
     * @return {number} The size of the visuals in bytes.
     *
     * @example
     * if(creep.room.visual.getSize() >= 512000) {
	 *     // cannot add more visuals in this tick
	 * }
     */
    getSize(): number {
        return
    }
}