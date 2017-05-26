/**
 * A flag. Flags can be used to mark particular spots in a room. Flags are visible to their owners only. You cannot have more than 10,000 flags.
 */
interface Flag extends RoomObject {
    /**
     * Flag primary color. One of the <code>COLOR_*</code> constants.
     */
    color: number,

    /**
     * A shorthand to <code>Memory.flags[flag.name]</code>. You can use it for quick access the flag's specific memory data object.
     */
    memory: any,

    /**
     * Flag’s name. You can choose the name while creating a new flag, and it cannot be changed later. This name is a hash key to access the flag via the {@link Game.flags} object. The maximum name length is 60 charactes.
     */
    name: string,

    /**
     * Flag secondary color. One of the <code>COLOR_*</code> constants.
     */
    secondaryColor: number,

    /**
     * Remove the flag.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @return {} Always returns {@link OK}.
     */
    remove(): number,

    /**
     * Set new color of the flag.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {string} color Primary color of the flag. One of the <code>COLOR_*</code> constants.
     * @param {string} secondaryColor (optional) Secondary color of the flag. One of the <code>COLOR_*</code> constants.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td><code>color</code> is not a valid color constant.</td>
     *   </tr>
     * </table>
     *
     * @example
     * Game.flags.Flag1.setColor(COLOR_GREEN, COLOR_WHITE);
     */
    setColor(color: string, secondaryColor?: string): number,

    /**
     * Set new position of the flag.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {number} x The X position in the room.
     * @param {number} y The Y position in the room.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target provided is invalid.</td>
     *   </tr>
     * </table>
     *
     * @example
     * Game.flags.Flag1.setPosition(10,20);
     *
     * @example
     * Game.flags.Flag1.setPosition( new RoomPosition(10, 20, 'W3S5') );
     */
    setPosition(x: number, y: number): number,

    /**
     * Set new position of the flag.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {RoomPosition | RoomObject} pos Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target provided is invalid.</td>
     *   </tr>
     * </table>
     *
     * @example
     * Game.flags.Flag1.setPosition(10,20);
     *
     * @example
     * Game.flags.Flag1.setPosition( new RoomPosition(10, 20, 'W3S5') );
     */
    setPosition(pos: RoomPosition | RoomObject): number,
}