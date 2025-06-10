// myLib.d.ts
declare module 'react-dnd' {
    import { DragSourceHookSpec, DragObjectWithType, ConnectDragSource } from 'react-dnd';

    export function useDrag<
        any
    >(
        spec: DragSourceHookSpec<DragObject, DropResult, CollectedProps>
    ): [CollectedProps, ConnectDragSource, () => void];
}

declare module 'react-modal' {
    import * as React from 'react'
    export interface Props {
        isOpen: boolean
        onRequestClose?: () => void
        contentLabel?: string
        style?: any
        ariaHideApp?: boolean
        shouldCloseOnOverlayClick?: boolean
        // ...thêm các prop cần thiết
        [key: string]: any
    }
    export default class Modal extends React.Component<Props> {
        static setAppElement(element: string | HTMLElement): void
    }
}
