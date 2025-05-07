import { flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { theme } from 'antd';
import { useEffect } from 'react';
import styles from './style.module.scss';
const { useToken } = theme;

type Props = {
  countColumn?: number;
  currentRow: Array<any>;
  rowStyle?: any;
  rows: any;
  overFlow?: boolean;
  container: any;
  contextMenu?: any;
  onLoadMore?(): void;
  setShowMenu?(value: any): void;
  onDoubleClick?(rowSelected: any): void;
  onClick?(rowSelected: any): void;
  cellStyle?: any;
  flexGrow?: boolean;
  multitle?: boolean;
  multitleItem?: Array<any>;
};

const TableBody = ({
  countColumn,
  rows,
  container,
  rowStyle,
  currentRow,
  cellStyle,
  flexGrow,
  onClick,
  onLoadMore,
  onDoubleClick,
  multitleItem,
  ...props
}: Props) => {
  const { token } = useToken();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => (rowStyle && rowStyle.height ? rowStyle.height : 35),
    getScrollElement: () => container,
    overscan: 0,
  });

  useEffect(() => {
    if (container) {
      const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
      const hasNextPage = true;
      const isFetchingNextPage = false;

      if (!lastItem) {
        return;
      }
      if (lastItem.index >= rows.length - 1 && hasNextPage && !isFetchingNextPage) {
        onLoadMore && onLoadMore();
      }
    }
  }, [rowVirtualizer.isScrolling]);

  return (
    <>
      <tbody
        className={styles.body}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          flexDirection: 'column',
          overflow: props.overFlow !== undefined && props.overFlow === false ? 'hidden' : 'auto',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
          const row = rows[virtualRow.index];
          const active = currentRow.find((item: any) => row.id === item.id);
          const checkMultitle = multitleItem?.find((item: any) => row.id === item.id);
          return (
            <tr
              key={virtualRow.index}
              onMouseDown={
                onClick
                  ? (e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.button === 0) {
                        e.target.click();

                        switch (e.detail) {
                          case 1:
                            onClick && onClick([row]);
                            break;
                          case 2:
                            onDoubleClick && !props.multitle && onDoubleClick([row]);
                            break;
                          default:
                            break;
                        }
                      }
                    }
                  : undefined
              }
              onContextMenu={() => {
                onClick && onClick([row]);
              }}
              className={`${styles.row} ${row.getIsSelected() ? styles.active : ''}`}
              data-index={virtualRow.index}
              ref={(node) => rowVirtualizer.measureElement(node)}
              style={{
                borderColor: token.colorBorder,
                transform: `translateY(${virtualRow.start}px)`,
                background: props.multitle && checkMultitle ? 'lightblue' : active ? '#bebebe' : 'white',
                ...rowStyle,
                display: flexGrow ? '' : 'flex',
              }}
            >
              {row.getVisibleCells().map((cell: any, idx: number) => {
                return (
                  cell.column.columnDef.show && (
                    <td
                      key={idx}
                      className={styles.cell}
                      style={{
                        display: 'flex',
                        borderColor: token.colorBorder,
                        width: countColumn === 1 ? '100%' : cell.column.getSize(),
                        padding: 5,
                        ...cellStyle,
                        flexGrow: flexGrow && 1,
                      }}
                    >
                      {cell.column.columnDef.id !== 'index'
                        ? flexRender(cell.column.columnDef.cell, cell.getContext())
                        : Number(row.id) + 1}
                    </td>
                  )
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default TableBody;
