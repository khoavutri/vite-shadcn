import { theme } from 'antd';
import { Fragment } from 'react';
import Cell from './cell/cell';
import styles from './style.module.scss';
const { useToken } = theme;

type Props = {
  data: any;
  table: any;
  canFilter: boolean;
  canResize: boolean;
  style?: any;
  flexGrow?: boolean;
};

const TableHeader = ({ data, canFilter, canResize, table, flexGrow, ...props }: Props) => {
  const { token } = useToken();

  return data.map(({ headers, id }: any) => {
    return (
      <Fragment key={id}>
        <tr
          key={id}
          style={{
            borderColor: token.colorBorder,
            background: token.colorBgContainer,
            ...props.style,
            display: flexGrow ? '' : 'flex',
          }}
          className={styles.row}
        >
          {headers.map((header: any) => {
            const { useSort } = header.column.columnDef;
            if (header.column.columnDef.show) {
              return (
                <Cell
                  flexGrow={flexGrow}
                  key={header.id}
                  table={table}
                  header={header}
                  canSort={useSort}
                  canResize={canResize}
                />
              );
            }
          })}
        </tr>
        {canFilter && (
          <tr
            className={styles.row}
            style={{ borderColor: token.colorBorder, background: token.colorBgLayout, display: 'flex' }}
          >
            {headers.map((header: any) => {
              if (header.column.columnDef.show) {
                return (
                  <th
                    style={{
                      width: header.getSize(),
                      borderColor: token.colorBorder,
                      flexGrow: flexGrow ? 1 : 0,
                    }}
                    key={header.id}
                    className={styles.cell}
                  >
                    {header.column.columnDef.filter && header.column.columnDef.filter}
                  </th>
                );
              }
            })}
          </tr>
        )}
      </Fragment>
    );
  });
};

export default TableHeader;
