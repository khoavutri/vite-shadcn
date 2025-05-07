import { flexRender } from '@tanstack/react-table';
import styles from './style.module.scss';
import { theme } from 'antd';
import { TbCaretDownFilled, TbCaretUpDownFilled, TbCaretUpFilled } from 'react-icons/tb';
import { useDrag, useDrop } from 'react-dnd';
const { useToken } = theme;

type Props = {
  table: any;
  header: any;
  canResize: boolean;
  canSort: boolean;
  flexGrow?: boolean;
};

const reorderColumn = (draggedColumnId: string, targetColumnId: string, columnOrder: Array<string>) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

const Cell = ({ table, header, canResize, canSort, flexGrow }: Props) => {
  const { token } = useToken();
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: any) => {
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  const renderSortIcon = (isSorted: any) => {
    if (!isSorted) {
      return <TbCaretUpDownFilled />;
    } else {
      if (isSorted === 'asc') {
        return <TbCaretUpFilled />;
      } else {
        return <TbCaretDownFilled />;
      }
    }
  };

  return (
    <th
      ref={dropRef}
      key={header.id}
      colSpan={header.colSpan}
      className={styles.cell}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: header.getSize(),
        borderColor: token.colorBorder,
        background: token.colorBgLayout,
        flexGrow: flexGrow ? 1 : 0,
      }}
      onClick={(e) => {
        canSort && header.column.getToggleSortingHandler()(e);
      }}
    >
      <div ref={dragRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        {header && flexRender(header.column.columnDef.header, header.getContext())}
        {canSort && <span>{renderSortIcon(header.column.getIsSorted())}</span>}
        {canResize && (
          <div
            className={styles.resizeHandler}
            onMouseDown={(e) => {
              e.preventDefault();
              header.getResizeHandler()(e);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              header.getResizeHandler()(e);
            }}
          />
        )}
      </div>
    </th>
  );
};

export default Cell;
