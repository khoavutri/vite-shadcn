import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Button, Dropdown, theme } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useStateWithPromise } from '../../../hooks/use-hook';
import TableBody from './body/table-body';
import TableHeader from './header/table-header';
import styles from './style.module.scss';

type Props = {
  rowStyle?: any;
  columns: any;
  data: any;
  canResize: boolean;
  canFilter: boolean;
  contextMenu?: any;
  eventHandler?: {
    onClick?(listRowSelected: Array<any>): void;
    onDoubleClick?(rowSelected: any): void;
    onSortChange?(sorting: any): void;
    onStateChange?(state: any): void;
    onLoadMore?: any;
  };
  headerStyle?: any;
  showHeader?: boolean;
  overFlow?: boolean;
  cellStyle?: any;
  flexGrow?: boolean;
  multitle?: boolean;
  checkMultitle?(row: any): boolean;
};

const Table = (props: Props) => {
  const { token } = theme.useToken();
  const parentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<any>(null);
  const [activeRow, setActiveRow] = useState<any>([]);
  const [sorting, setSorting] = useStateWithPromise<any>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState(props.columns.map((column: any) => column.id));
  const [multitleItem, setMultitleItem] = useState<Array<any>>([]);
  const table = useReactTable({
    state: {
      sorting,
      columnVisibility,
      columnOrder,
    },
    data: props.data,
    columns: props.columns,
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onSortingChange: async (e: any) => {
      const mode = await setSorting(e);
      props.eventHandler?.onSortChange && props.eventHandler?.onSortChange(mode);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  const { rows } = table.getRowModel();

  useEffect(() => {
    props.eventHandler?.onStateChange && props.eventHandler?.onStateChange(table.getState());
  }, [table.getState()]);

  return (
    <>
      <Button
        style={{ display: 'none' }}
        id='clear-multitle-item'
        onClick={() => {
          setMultitleItem([]);
        }}
      />
      <Dropdown
        getPopupContainer={() => document.body}
        forceRender={true}
        dropdownRender={() => {
          return props.contextMenu && !props.multitle ? (
            React.cloneElement(props.contextMenu, { rowSelection: activeRow })
          ) : (
            <></>
          );
        }}
        trigger={['contextMenu']}
      >
        <div
          className={styles.tableContainer}
          ref={parentRef}
          style={{
            borderColor: token.colorBorder,
            overflow: props.overFlow !== undefined && props.overFlow === false ? 'hidden' : 'auto',
          }}
        >
          <table className={styles.table} ref={tableRef}>
            {props.showHeader !== undefined && props.showHeader === false ? (
              ''
            ) : (
              <thead className={styles.header}>
                <TableHeader
                  table={table}
                  data={table.getHeaderGroups()}
                  canFilter={props.canFilter}
                  canResize={props.canResize}
                  style={props.headerStyle || null}
                  flexGrow={props.flexGrow}
                />
              </thead>
            )}

            <TableBody
              multitleItem={multitleItem}
              multitle={props.multitle}
              flexGrow={props.flexGrow}
              rowStyle={props.rowStyle ? props.rowStyle : {}}
              rows={rows}
              container={parentRef.current}
              onLoadMore={() => {
                props.eventHandler?.onLoadMore();
              }}
              onDoubleClick={props.eventHandler?.onDoubleClick}
              onClick={
                props.multitle
                  ? (row) => {
                    if (multitleItem.find((item: any) => item.id === row[0].id)) {
                      setMultitleItem((prev) => prev.filter((item: any) => item.id !== row[0].id));
                    } else {
                      const check = props.checkMultitle ? props.checkMultitle(row[0]) : true;
                      if (check) {
                        setMultitleItem([...multitleItem, ...row]);
                      }
                    }
                  }
                  : props.eventHandler?.onClick
                    ? (listRowSelected) => {
                      if (props.eventHandler?.onClick) {
                        setActiveRow(listRowSelected);
                        props.eventHandler?.onClick(listRowSelected);
                      }
                    }
                    : undefined
              }
              currentRow={activeRow}
              countColumn={props.columns.length}
              overFlow={props.overFlow}
              cellStyle={props.cellStyle}
            />
          </table>
        </div>
      </Dropdown>
    </>
  );
};
export default memo(Table);
