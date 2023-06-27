import React, { useEffect, useState } from 'react';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { TreeMap } from '@progress/kendo-react-treemap';
import axios from 'axios';

interface CompanyData {
    construction_company: string;
    total_area_sum: number;
}

interface TreeItem {
    name: string;
    value: number;
}

export const HeatmapView = () => {
    const [data, setData] = useState<TreeItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://10.221.72.80:8000/dashboard/project/construction_company_total_area');
            const fetchedData: CompanyData[] = response.data;
            const treeData: TreeItem[] = fetchedData.map(item => ({
                name: item.construction_company,
                value: item.total_area_sum,
            }));
            setData(treeData);
        };
        fetchData();
    }, []);

    const nFormatter = (num: number) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    const toolTipTemplate = (context: any) => {
        const { text, dataItem } = context;
        return (
            <span>
                <span>Company: {text}</span>
                <br />
                <span>Total Area: {nFormatter(dataItem.value)}</span>
            </span>
        );
    }

    return (
        <div>
            <Tooltip showCallout={false} content={toolTipTemplate}>
                <TreeMap data={data} textField="name" valueField="value" colors={["#00AD51", "#00EF81"]} />
            </Tooltip>
        </div>
    );
}
