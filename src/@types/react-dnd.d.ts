// myLib.d.ts
declare module 'react-dnd' {
    import { DragSourceHookSpec, DragObjectWithType, ConnectDragSource } from 'react-dnd';

    export function useDrag<
        any
    >(
        spec: DragSourceHookSpec<DragObject, DropResult, CollectedProps>
    ): [CollectedProps, ConnectDragSource, () => void];
}
