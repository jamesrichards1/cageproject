import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("movie_name", {
    header: () => "Movie Name",
  }),
  columnHelper.accessor("net_upvotes", {
    id: "score",
    header: () => "Score",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("poster_path", {
    header: () => "Poster",
    cell: (info) => <img src={info.getValue()} className="w-20"></img>,
  }),
];

const ScoreBoard = ({ scores }) => {
  const [data, setData] = useState(() => [...scores]);

  useEffect(() => {
    setData(scores);
  }, [scores]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    console.log(scores);
  }, [scores]);

  return (
    <div className="flex items-center justify-center">
      {" "}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
