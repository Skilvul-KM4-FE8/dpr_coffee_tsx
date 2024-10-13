import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "./custom-tooltip";

type Props = {
  data: any[];
};

export const ComposedVariant = ({ data }: Props) => {
  return (
    <>
      <ResponsiveContainer width={"105%"} height={370} className={"mx-auto px-5 pt-8"}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <defs>
            <linearGradient id="totalPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5F619D" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6093A5" stopOpacity={0} />
            </linearGradient>
            {/* <linearGradient id="createdAt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6195A6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#6195A6" stopOpacity={0} />
                        </linearGradient> */}
          </defs>
          <XAxis dataKey={"createdAt"} />
          <YAxis />
          <CartesianGrid strokeDasharray={"3 3"} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="totalPrice" stroke="#5F619D" fillOpacity={1} fill="url(#totalPrice)" />
          <Line type="monotone" dataKey="totalPrice" stroke="#5F619D" fillOpacity={1} fill="url(#totalPrice)" />
          <Bar type="monotone" dataKey="totalPrice" stroke="#5F619D" fillOpacity={1} fill="url(#totalPrice)" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};
