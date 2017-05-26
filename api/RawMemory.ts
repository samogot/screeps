/**
 * RawMemory object allows to implement your own memory stringifier instead of built-in serializer
 * based on <code>JSON.stringify</code>. It also allows to request up to 10 MB of additional memory
 * using asynchronous memory segments feature.
 * {@link http://docs.screeps.com/global-objects.html#Memory-object Learn more}
 */
const RawMemory: RawMemory;

/**
 * RawMemory object allows to implement your own memory stringifier instead of built-in serializer
 * based on <code>JSON.stringify</code>. It also allows to request up to 10 MB of additional memory
 * using asynchronous memory segments feature.
 * {@link http://docs.screeps.com/global-objects.html#Memory-object Learn more}
 */
interface RawMemory {
    /**
     * An object with asynchronous memory segments available on this tick. Each object key is the segment ID with data in string values. Use <code>RawMemory.setActiveSegments</code> to fetch segments on the next tick. Segments data is saved automatically in the end of the tick.
     *
     * @example
     * RawMemory.setActiveSegments([0,3]);
     * // on the next tick
     * console.log(RawMemory.segments[0]);
     * console.log(RawMemory.segments[3]);
     * RawMemory.segments[3] = '{"foo": "bar", "counter": 15}';
     */
    segments: { [id: number]: string },

    /**
     * Get a raw string representation of the <code>Memory</code> object.
     *
     * This method has insignificant CPU cost.
     *
     * @return {string} Returns a string value.
     *
     * @example
     * const myMemory = JSON.parse(RawMemory.get());
     */
    get(): string,

    /**
     * Set new <code>Memory</code> value.
     *
     * This method has insignificant CPU cost.
     *
     * @param {string} value New memory value as a string.
     *
     * @example
     * RawMemory.set(JSON.stringify(myMemory));
     */
    set(value: string): void,

    /**
     * Request memory segments using the list of their IDs. Memory segments will become available on the next tick in <code>RawMemory.segments</code> object.
     *
     * This method has insignificant CPU cost.
     *
     * @param {number[]} ids An array of segment IDs. Each ID should be a number from 0 to 99. Maximum 10 segments can be active at the same time. Subsequent calls of <code>setActiveSegments</code> override previous ones.
     *
     * @example
     * RawMemory.setActiveSegments([0,3]);
     */
    setActiveSegments(ids: number[]),
}