import { AreaChart, BarChart, ChartBarStacked, FileSearch, LineChart, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { AreaVariant } from "./area-variant";
import { BarVariant } from "./bar-variant";
import { LineVariant } from "./line-variant";
import { ComposedVariant } from "./composed-variant";
import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  data: any[];
  disabled: boolean;
};

export const Chart = ({ data, disabled }: Props) => {
  const [variant, setVariant] = useState("area");

  const handleChangeChart = (value: string) => {
    setVariant(value);
  };

  if (disabled) {
    return (
      <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
        <Loader2 className="animate-spin size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="w-full flex justify-end">
            <Select value={variant} onValueChange={handleChangeChart}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose Chart Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">
                  <div className="flex items-center py-2 px-4">
                    <AreaChart className="size-6 mr-4 text-muted-foreground" />
                    <p>Area Chart</p>
                  </div>
                </SelectItem>
                <SelectItem value="bar">
                  <div className="flex items-center py-2 px-4">
                    <BarChart className="size-6 mr-4 text-muted-foreground" />
                    <p>Bar Chart</p>
                  </div>
                </SelectItem>
                <SelectItem value="line">
                  <div className="flex items-center py-2 px-4">
                    <LineChart className="size-6 mr-4 text-muted-foreground" />
                    <p>Line Chart</p>
                  </div>
                </SelectItem>
                <SelectItem value="composed">
                  <div className="flex items-center py-2 px-4">
                    <ChartBarStacked className="size-6 mr-4 text-muted-foreground" />
                    <p>Composed Chart</p>
                  </div>
                </SelectItem>
                {/* <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="composed">Composed</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
              <FileSearch className="size-6 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">No Data for this period</p>
            </div>
          ) : (
            <>
              {variant === "area" && <AreaVariant data={data} />}
              {variant === "bar" && <BarVariant data={data} />}
              {variant === "line" && <LineVariant data={data} />}
              {variant === "composed" && <ComposedVariant data={data} />}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
