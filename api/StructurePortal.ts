/**
 * A non-player structure. Instantly teleports your creeps to a distant room acting as a room exit tile.
 * Portals appear randomly in the central room of each sector.</p>
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td><b>Stable time</b></td>
 *         <td>10 days</td>
 *     </tr>
 *     <tr>
 *         <td><b>Decay time</b></td>
 *         <td>30,000 ticks</td>
 *     </tr>
 *
 * </table>
 */
interface StructurePortal extends Structure {
    /**
     * The position object in the destination room.
     */
    destination: RoomPosition,

    /**
     * The amount of game ticks when the portal disappears, or undefined when the portal is stable.
     */
    ticksToDecay: number,
}