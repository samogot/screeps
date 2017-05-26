/**
 * A site of a structure which is currently under construction. A construction site can be created using the 'Construct' button at the left of the game field or the {@link Room.createConstructionSite} method.
 *
 * To build a structure on the construction site, give a worker creep some amount of energy and perform {@link Creep.build} action.
 */
interface ConstructionSite extends RoomObject {
    /**
     * A unique object identificator. You can use {@link Game.getObjectById} method to retrieve an object instance by its <code>id</code>.
     */
    id: string,

    /**
     * Whether this is your own construction site.
     */
    my: boolean,

    /**
     * An object with the structure’s owner info containing the following properties:
     */
    owner: {

        /**
         * The name of the owner user.
         */
        username: string,
    },

    /**
     * The current construction progress.
     */
    progress: number,

    /**
     * The total construction progress needed for the structure to be built.
     */
    progressTotal: number,

    /**
     * One of the <code>STRUCTURE_*</code> constants.
     */
    structureType: string,

    /**
     * Remove the construction site.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this construction site.</td>
     *   </tr>
     * </table>
     */
    remove(): number,
}