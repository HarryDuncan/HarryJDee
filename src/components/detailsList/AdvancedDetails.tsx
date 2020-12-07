import * as React from 'react';
import { SpinnerSize, Spinner, DetailsList, IColumn, SelectionMode, ContextualMenu, DirectionalHint, ContextualMenuItemType, SearchBox, DetailsListLayoutMode, CommandBar, IDetailsRowProps, Selection, ScrollablePane, Sticky, StickyPositionType, IDetailsHeaderProps, IRenderFunction, MarqueeSelection, DetailsHeader, TooltipHost, ITooltipHostProps, Icon } from 'office-ui-fabric-react';
import moment from 'moment-timezone';
import './AdvancedDetailsList.css'

interface IAdvancedColumn extends IColumn {
    fieldName:string,
    isDate?:boolean;
    includeTimeInFilter?:boolean;
    multiValue?:boolean;
    altMinWidth?:number,
    altMaxWidth?:number,
    altIconName?:string,
    tooltipProps?: any;
}

interface IAdvancedDetailsListProps {
    isLoading:boolean;
    timezone?: string;

    items:any[];
    columns:IAdvancedColumn[];
    groups?:any[];
    groupProps?: any;
    defaultSortColumnKey?:string|number;
    defaultSortColumnIsSortedDescending?:boolean;
    listClassName?: string;
    className?: string;
    viewName?: string;

    layoutMode?: DetailsListLayoutMode;

    // Selection
    selectionMode?: "single"|"multiple"|"none";
    onSelectionChanged?(item?: any): void;

    showCommandBar?:boolean;
    commandBarItems?:any[];
    commandBarFarItems?:any[];

    showAlternateLayout?:boolean;
    alternateLayoutWidth?:number;

    compact?: boolean;
    isHeaderVisible?: boolean;

    canSelectItem?(item: any, index?: number): boolean;
    getContextMenuItems?(item?: any): any[];
    onContextMenuDismiss?(): any;
    onRenderRow?(props?: IDetailsRowProps): JSX.Element;
    onRenderColumn?(item?: any, index?: number, column?: IColumn): JSX.Element;
    onSortColumn?(items: any[], columnKey: string, isSortedDescending?:boolean):any[];
    onRecalculateGroups?(items: any[]):any[];
   
    onItemInvoked?(item?: any, index?: number, ev?:Event): void;
    onCountOfItems?(items?: any): void;
}

interface IAdvancedDetailsListState {
    timezone: string;
    items:any[];
    groups?:any[];
    allItems:any[];
    columns:any[];
    contextMenuProps?: any;
    filters:any;
    currentSearch?:string;
    selectedItem?:any;
    resizing:boolean;
    optionalCommandBarItems?:any[];
}

class AdvancedDetailsList extends React.Component<IAdvancedDetailsListProps, IAdvancedDetailsListState> {
    private _selection: Selection;

    constructor(props: IAdvancedDetailsListProps) {
        super(props);

        this._selection = new Selection({
            onSelectionChanged: this._onSelectionChanged,
            canSelectItem:this.props.canSelectItem
        });
        this.state = {
            timezone: this.props.timezone ? this.props.timezone : 'Australia/Melbourne',
            columns: this.props.columns,
            items: this.props.items,
            groups: this._getItemGroups(this.props.items),
            allItems: this.props.items,
            filters: {},
            resizing:false
        };
    }

    public componentDidMount() {
        this._resetSorting();
    }

    // public shouldComponentUpdate(nextProps: IAdvancedDetailsListProps, nextState: IAdvancedDetailsListState): boolean {
    //     return true;
    // }

    public componentDidUpdate(prevProps: IAdvancedDetailsListProps) {
        if(prevProps.items !== this.props.items || prevProps.columns !== this.props.columns) {
            this.refreshDetailsList(prevProps.viewName !== this.props.viewName,true);
        }
    }

    public refreshDetailsList(reset?: boolean, updateColumns?: boolean) {

        const sortedColumn = this.state.columns.find(column => column.isSorted);
        const columns = reset ? this.props.columns : updateColumns ? 
            this.props.columns.map(column => ({
                ...column,
                ...(sortedColumn && column.key === sortedColumn.key ? {isSorted: true, isSortedDescending: sortedColumn.isSortedDescending} : {}),
                isFiltered: this.state.columns && this.state.columns.find(col => col.key === column.key) ? this.state.columns.find(col => col.key === column.key).isFiltered : undefined
            }))
        : this.state.columns;
        const allItems = this.props.items;
        const items = this._getFilteredItems(allItems,reset ? {} : this.state.filters, reset || !sortedColumn ? this._getDefaultSortColumn() : columns.find(column => column.isSorted));
        this.setState({
            items,
            groups: this._getItemGroups(items),
            allItems,
            filters: reset ? {} : this.state.filters,
            columns: columns,
            optionalCommandBarItems: this._getFilterCommandBarItem(items, reset ? {} : this.state.filters)
        });
    }

    public updateSelection(key?: string|number) {
        this._updateSelection(key);
        if(!this.props.showAlternateLayout && !this.state.resizing) {
            this.setState({
                resizing:true
            }, () => {
                this.setState({ resizing: false })
            })
        }        
    }

    public render() {       
        const _getAltColumns = (): any[] => {
            return this.state.columns.map(column => {
                return {
                    ...column,
                    ...(column.altIconName ? {
                        iconName: column.altIconName,
                        isIconOnly: true
                    } : {}),
                    ...(column.altMaxWidth ? {
                        maxWidth: column.altMaxWidth
                    } : {}),
                    ...(column.altMinWidth ? {
                        minWidth: column.altMinWidth
                    } : {})
                }
            });
        }

        const columns = this.props.showAlternateLayout ? _getAltColumns() : this.state.columns;

        return (
            <div className={this.props.className}>
                {(this.props.isLoading || !this.props.items) &&
                <div className={`dashboard-container dashboard-spinner ${this.props.showAlternateLayout ? 'dashboard-form-open' : ''}`}>
                <Spinner style={{paddingTop:'160px'}}
                    size={SpinnerSize.large}
                /></div>}
                {!this.props.isLoading && this.props.items &&
                <div className={`dashboard-container ${this.props.listClassName ? this.props.listClassName : ''} ${this.props.showAlternateLayout ? 'dashboard-form-open' : ''} ${this.props.selectionMode === 'multiple' ? 'multiSelect' : ''}`}>
                {this.props.showCommandBar && (this.props.commandBarItems || (this.state.optionalCommandBarItems && this.state.optionalCommandBarItems.length > 0) || this.props.commandBarFarItems) && 
                    // <Sticky stickyPosition={StickyPositionType.Header}>
                        <CommandBar
                            items={this.props.commandBarItems ? this.props.commandBarItems : []}
                            farItems={[
                                ...(this.state.optionalCommandBarItems ? this.state.optionalCommandBarItems : []),
                                ...(this.props.commandBarFarItems ? this.props.commandBarFarItems : [])
                            ]}
                        />
                    // </Sticky>
                }
                <div className='dashboard-list-container'>
                <ScrollablePane>
                <MarqueeSelection selection={this._selection}>
                <DetailsList className='ms-slideUpIn10'
                    setKey="set"
                    items={this.state.items}
                    columns={columns}
                    groups={this.state.groups ? this.state.groups : this.props.groups}
                    {...(this.props.groups ? {
                        groupProps: {
                            onRenderHeader: this._onRenderGroupHeader,
                            ...(this.props.groupProps ? this.props.groupProps : {})
                        }
                    } : {})}
                    selection={this._selection}
                    selectionMode={this._getSelectionModes(this.props.selectionMode)}
                    selectionPreservedOnEmptyClick={true}
                    onColumnHeaderClick={this._onColumnClick}
                    onColumnHeaderContextMenu={this._onColumnContextMenu}
                    layoutMode={this.props.layoutMode ? this.props.layoutMode : DetailsListLayoutMode.justified}
                    onRenderDetailsHeader={this._onRenderDetailsHeader}
                    onRenderRow={this.props.onRenderRow}
                    onItemContextMenu={this._handleItemContextMenu}
                    onItemInvoked={this.props.onItemInvoked}
                    compact={this.props.compact}
                    isHeaderVisible={this.props.isHeaderVisible}
                />
                </MarqueeSelection>
                {this.state.contextMenuProps && <ContextualMenu
                    {...this.state.contextMenuProps}
                    />}
                </ScrollablePane>
                </div>
                </div>}
            </div>
        );
    }

    private _getSelectionModes = (selectionModeType: 'single'|'multiple'|'none'|undefined): SelectionMode => {
        switch(selectionModeType){
            case 'single':
                return SelectionMode.single;
            case 'multiple':
                return SelectionMode.multiple;
            case 'none':
            default:
                return SelectionMode.none
        }
    }
    private _getColumnContextMenuItems = (column?: any, search?: string, filters?: any): any => {
        let values = this.state.allItems.map(item => {
            return item[column.fieldName]
        });

        if(column.multiValue) {
            values = [].concat.apply([],values);
        }

        const filterValues = Array.from(new Set(values.filter(value => !!value))).sort(sortAscending);

        filters = filters ? filters : this.state.filters;
        search = search ? search : this.state.currentSearch;

        const existingFilters = filters[column.fieldName];

        let filtersWithoutColumn = {
            ...filters,
            [column.fieldName]: undefined
        }

        values = this._getFilteredItems(this.state.allItems,filtersWithoutColumn).map((item: any) => {
            return item[column.fieldName]
        });

        if(column.multiValue) {
            values = [].concat.apply([],values);
        }

        let availableValues = Array.from(new Set(values.filter(value => !!value))).sort(sortAscending);

        let filterChoices = Array.from(new Set([...(existingFilters ? existingFilters : []),...availableValues,...filterValues]));

        if(search && search.length > 0) {
            filterChoices = filterChoices.filter(choice => {
                let value = column.isDate && moment(choice, moment.ISO_8601, true).isValid() ? moment(choice).tz(this.state.timezone).format(column.includeTimeInFilter ? 'DD/MM/YYYY h:mmA' : 'DD/MM/YYYY') : choice;
                
                return value.toString().toLowerCase().indexOf(search!.toLowerCase()) > -1
            });
        }

        let menuItems: any = [
            {
              key: 'ascending',
              name: 'Sort Ascending',
              iconProps: { iconName: 'SortUp' },
              canCheck: true,
              checked: column.isSorted && !column.isSortedDescending,
              onClick: () => this._onSortColumn(column, false)
            },
            {
              key: 'descending',
              name: 'Sort Descending',
              iconProps: { iconName: 'SortDown' },
              canCheck: true,
              checked: column.isSorted && column.isSortedDescending,
              onClick: () => this._onSortColumn(column, true)
            }
        ];

        if(existingFilters) {
            menuItems.push({
                key: 'clearFilters',
                name: 'Remove Filters',
                iconProps: {iconName:'clearFilter'},
                onClick: () => this._clearColumnFilters(column)
            });
        }

        menuItems = [...menuItems,
                {
                    key:'filters',
                    itemType:ContextualMenuItemType.Section,
                    sectionProps: {
                        key:'searchGroup',
                        topDivider: true,
                        items: [
                            {
                                key: 'searchFilter',
                                name: column.name,
                                column,
                                onRender: this._renderFilterListSearch
                            },
                            ...filterChoices.map(value => ({
                                key: value, 
                                name: column.isDate && moment(value, moment.ISO_8601, true).isValid() ? moment(value).tz(this.state.timezone).format(column.includeTimeInFilter ? 'DD/MM/YYYY h:mmA' : 'DD/MM/YYYY') : value,
                                canCheck: true,
                                checked: filters[column.fieldName] && filters[column.fieldName].find((filter: any) => filter === value),
                                onClick: (ev?: any) => this._onFilterColumn(column, value, ev),
                                disabled: !availableValues.find((filter: any) => filter === value)
                            }))
                        ]
                    }
                }
        ];

        return menuItems;
   
    }

    private _onColumnContextMenu = (column?: any, ev?: React.MouseEvent<HTMLElement>): void => {
        this.setState({
            contextMenuProps: {
                items: this._getColumnContextMenuItems(column),
                  target: ev!.currentTarget as HTMLElement,
                  directionalHint: DirectionalHint.bottomLeftEdge,
                  gapSpace: 10,
                  isBeakVisible: true,
                  onDismiss: () => this.setState({contextMenuProps:undefined,currentSearch:undefined})
            }
        });
    }

   // @ts-ignore
    private _renderFilterListSearch = (item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void ): JSX.Element => {
        // @ts-ignore
        const onChangeFilterSearch = (event?: any, search?: any) => this._updateColumnContextMenuItems(item.column, search);
        const onClearFitlerSearch = () => {
            this.setState({currentSearch:undefined},
            () => this._updateColumnContextMenuItems(item.column, undefined));
            
        } 
        const onEnterFilterSearch = (search: any) => this._selectFiltersWithSearchValue(search, item.column);

        return (
            <div key='searchContainer'>
              <SearchBox key='searchBox'
                placeholder={`Search ${item.name}`}
                onClear={onClearFitlerSearch}
                onChange={onChangeFilterSearch}
                onSearch={onEnterFilterSearch}
                styles={{
                  root: [{ margin: '8px' }]
                }}
              />
            </div>
        );
    }

    private _updateColumnContextMenuItems = (column: any, search?: string): void => {
        this.setState({
            contextMenuProps: {
                ...this.state.contextMenuProps,
                items: this._getColumnContextMenuItems(column, search)
            },
            currentSearch: search
        });        
    }

    private _onFilterColumn = (column:any, value: any, ev?: any): void => {
        const field = column.fieldName;
        const checked = !!(this.state.filters[field] && this.state.filters[field].find((filter: any) => filter === value))
        const removeFilters = checked && this.state.filters[field].filter((filter: any) => filter !== value);
    
        const filters = {
            ...this.state.filters,
            [field]: !checked ? (this.state.filters[field] ? [...this.state.filters[field],value] : [value]) : removeFilters.length ? removeFilters : undefined
        }

        const isFiltered = !(checked && !removeFilters.length);
        const items = this._getFilteredItems(this.state.allItems, filters, this.state.columns.find(col => col.isSorted));
        this._updateSelection(items);

        this.setState({
            items,
            groups: this._getItemGroups(items),
            contextMenuProps: {
                ...this.state.contextMenuProps,
                items: this._getColumnContextMenuItems(column, undefined, filters)
            },
            columns:this._getUpdatedColumnsFiltered(column, isFiltered),
            filters,
            optionalCommandBarItems: this._getFilterCommandBarItem(items, filters)
        });
        ev.preventDefault();
    }

    private _selectFiltersWithSearchValue = (search: string, column: any):void => {
        let filtersWithoutColumn = {
            ...this.state.filters,
            [column.fieldName]: undefined
        };

        let values = this._getFilteredItems(this.state.allItems,filtersWithoutColumn).map((item: any) => {
            if(item[column.fieldName] instanceof Date) {
                return moment(item[column.fieldName]).tz(this.state.timezone).format('DD-MM-YYYY');
            } else {
                return item[column.fieldName]
            }
        }).filter((value:any) => !!value);

        if(column.multiValue) {
            values = [].concat.apply([],values);
        }

        let valuesToFilter = Array.from(new Set(values.filter((value:any) => (!this.state.filters[column.fieldName] || !this.state.filters[column.fieldName].includes(value)) && value.toString().toLowerCase().indexOf(search.toLowerCase()) > -1))).sort();

        if(valuesToFilter.length) {
            const filters = {
                ...this.state.filters,
                [column.fieldName]: this.state.filters[column.fieldName] ? [...this.state.filters[column.fieldName], valuesToFilter] : valuesToFilter
            };
            const items = this._getFilteredItems(this.state.allItems, filters, column);
            this._updateSelection(items);
            this.setState({
                items,
                contextMenuProps: undefined,
                columns:this._getUpdatedColumnsFiltered(column, true),
                filters,
                currentSearch:undefined,
                optionalCommandBarItems: this._getFilterCommandBarItem(items,filters)
            });        
        }
    }

    private _clearColumnFilters = (column:any): void => {
        let filters = {
            ...this.state.filters,
            [column.fieldName]: undefined
        };

        delete filters[column.fieldName];

        const items = this._getFilteredItems(this.state.allItems, filters, column)
        this._updateSelection(items);
        this.setState({
            items,
            groups: this._getItemGroups(items),
            filters,
            columns: this._getUpdatedColumnsFiltered(column, false),
            optionalCommandBarItems: Object.keys(filters).length > 0 ? this._getFilterCommandBarItem(items,filters) : this.state.optionalCommandBarItems!.filter(item => item.key !== 'clearFilters' && item.key !== 'filteredCount')
        });
    }

    private _getFilterCommandBarItem = (items?: any, filters?: any): any[] => {
        let appliedFilters: any = [];
        if(filters) {
            for(let filter in filters) {
                if(filters[filter] && filters[filter].length && this.state.columns.find(column => column.key === filter)) {
                    appliedFilters = [
                        ...appliedFilters,
                        filter
                    ]
                }
            }
        }

        return [
            ...(this.state.optionalCommandBarItems ? this.state.optionalCommandBarItems.filter(item => item.key !== 'clearFilters' && item.key !== 'filteredCount') : []),
            ...filters && appliedFilters.length > 0 ? [{
                key:'clearFilters',
                text:'Clear All Filters',
                iconProps: { iconName: 'ClearFilter' },
                onClick:this._clearAllFilters
            },{
                key:'filteredCount',
                text:'Count',
                // @ts-ignore
                onRender:(item: any, dismissMenu: any) => this._renderFilteredCount(items, filters)
            }] : []
        ]
    }

    private _renderFilteredCount = (items?: any, filters?: any) => {
        let appliedFilters: any = {};
        let filterCount = 0;
        if(filters) {
            for(let filter in filters) {
                if(filters[filter] && filters[filter].length && this.state.columns.find(column => column.key === filter)) {
                    appliedFilters = {
                        ...appliedFilters,
                        [filter]: filters[filter]
                    }
                    filterCount += filters[filter].length;
                }
            }
        }

        const _renderFilterTooltip = () => {
            let renderFilters: any = [];

            for(let filter in appliedFilters) {
                renderFilters.push(<div key={filter} className='applied-filters-row'><strong>{this.state.columns.find(column => column.key === filter).name} ({appliedFilters[filter].length}):</strong> {appliedFilters[filter].join('; ')}</div>)
            }

            return (
                <div className='list-commandbar-applied-filters-tooltip'><div className='applied-filters-title'>Applied Filters</div><div>{renderFilters}</div></div>
            )
        }

        return (
            <div className='list-commandbar-filtered-container'>
                <TooltipHost tooltipProps={{onRenderContent:() => _renderFilterTooltip()}}><div className='list-commandbar-filtered-count'><Icon iconName='Filter' /><div>({filterCount})</div></div></TooltipHost>
                <TooltipHost content='Count of Filtered Items'><div className='list-commandbar-filtered-count'><Icon iconName='NumberSymbol' /><div>({items ? this.props.onCountOfItems ? this.props.onCountOfItems(items) : items.length : 0})</div></div></TooltipHost>
            </div>
        )
    }

    private _getUpdatedColumnsFiltered = (column: any, isFiltered:boolean): IColumn[] => {
        return this.state.columns.map(col => {
            if (col.key === column.key) {
                col.isFiltered = isFiltered;
            }
            return col;
        });
    }

    private _getFilteredItems = (items: any, filters: any, sortColumn?: any): any => {
        items = items ? items.filter((item: any) => {
            let valid = true;
            for (let key in filters) {
                if(filters[key] && !!this.state.columns.find(column => column.key === key) && !filters[key].find((filter:any) => this.state.columns.find(column => column.key === key).multiValue && item[key] ? !!item[key].find((value: any) => filter === value) : filter === item[key])) {
                    valid = valid && false;
                }
            }
            return valid;
        }) : items;

        return sortColumn && (sortColumn.isSorted || sortColumn.defaultSort) ? this._sortItems(items, sortColumn.fieldName, sortColumn.isSortedDescending) : items;
    }

    private _onColumnClick = (event?: React.MouseEvent<HTMLElement>, column?: IColumn): void => {
        if(column && column.fieldName) {
            this._onColumnContextMenu(column, event);
        }
    };

    private _onSortColumn = (column: IColumn, isSortedDescending?: boolean): void => {
         // Sort the items.
        const sortedItems = this._sortItems(this.state.items!, column.fieldName!, isSortedDescending); 
        // Reset the items and columns to match the state.
        this._updateSelection();
        this.setState({
            items: sortedItems,
            groups: this._getItemGroups(sortedItems),
            columns: this.state.columns.map(col => {
            col.isSorted = col.key === column.key;
            
                if (col.isSorted) {
                    col.isSortedDescending = isSortedDescending;
                }
            
                return col;
            }),
            optionalCommandBarItems: [
                ...(this.state.optionalCommandBarItems ? this.state.optionalCommandBarItems : []),
                ...(!this.state.optionalCommandBarItems || !this.state.optionalCommandBarItems.find(item => item.key === 'resetSort') ? [{
                    key:'resetSort',
                    text:'Reset Sorting',
                    iconProps: { iconName: 'SortLines' },
                    onClick:this._resetSorting
                }] : [])
            ]
        });
    }

    private _resetSorting = (): void => {
        const items = this.state.allItems ? this._getFilteredItems(this.state.allItems,this.state.filters,this._getDefaultSortColumn()) : this.state.allItems;
        this.setState({
            columns: this.state.columns.map(column => ({
                ...column,
                isSorted: false
            })),
            items,
            groups: this._getItemGroups(items),
            optionalCommandBarItems: this.state.optionalCommandBarItems ? this.state.optionalCommandBarItems.filter(item => item.key !== 'resetSort') : undefined
        });
    }

    private _clearAllFilters = (): void => {
        const items = this._getFilteredItems(this.state.allItems,{},this.state.columns.find(column => column.isSorted));
        this.setState({
            columns: this.state.columns.map(column => ({
                ...column,
                isFiltered: false
            })),
            filters: {},
            items,
            groups: this._getItemGroups(items),
            optionalCommandBarItems: this.state.optionalCommandBarItems!.filter(item => item.key !== 'clearFilters' && item.key !== 'filteredCount')
        });
    }    

    private _updateSelection = (key?: number|string): void => {
            if(key){
                    this._selection.setItems(this.state.items,true);
                    this._selection.setKeySelected(key.toString(), true, false);
             } else {
                this._selection.setItems(this.state.items,true);
             }
    }

    private _onSelectionChanged = (): void => {
        const item = this._selection.getSelectedCount() > 0 ? this._selection.getSelection()[0] as any : undefined;
        if(!this.state.contextMenuProps) {
            if(item && this.props.selectionMode !== "multiple") {
                this.setState({
                    selectedItem: item,
                    resizing: !!this.props.showAlternateLayout
                }, () => {
                    this.setState({ resizing: false })
                    if(this.props.onSelectionChanged) {
                        this.props.onSelectionChanged(this.state.selectedItem);
                    }
                });
            } else if (this.props.selectionMode === "multiple") {
                if(this.props.onSelectionChanged) {
                    this.props.onSelectionChanged(this._selection.getSelection());
                }
            } else {
                this.setState({ selectedItem: undefined });
            }
        }
    }

    private _getDefaultSortColumn = (columns?: any[]): any => {
        let column = (columns ? columns : this.state.columns).find(column => column.key === this.props.defaultSortColumnKey);
        return {
            ...column ? column : {key:this.props.defaultSortColumnKey,fieldName:this.props.defaultSortColumnKey},
            isSortedDescending: this.props.defaultSortColumnIsSortedDescending,
            defaultSort: true
        }
    }

    private _sortItems = (items: any[], columnKey: string, isSortedDescending?:boolean): any[] => {
        if(this.props.onSortColumn) {
            return this.props.onSortColumn(items, columnKey, isSortedDescending);
        } else {
            return copyAndSortItems(items, columnKey, isSortedDescending);
        }
    }

    private _getItemGroups = (items: any[]): any[]|undefined => {
        if(this.props.onRecalculateGroups) {
            return this.props.onRecalculateGroups(items);
        } else {
            return undefined;
        }
    }
     // @ts-ignore
    private _handleItemContextMenu = (item?: any, index?:number, ev?: Event): boolean | void => {
        if(this.props.getContextMenuItems && item && ev) {
            ev.stopPropagation();
             this.setState({
                contextMenuProps: {
                    items: this.props.getContextMenuItems(this._selection.getSelection().length <= 1 ? item : this._selection.getSelection()),
                    target: ev.target,
                    directionalHint: DirectionalHint.bottomLeftEdge,
                    gapSpace: 0,
                    isBeakVisible: false,
                    onDismiss: () => this.setState({contextMenuProps:undefined,currentSearch:undefined}, () => { 
                        if(this.props.onContextMenuDismiss) {
                            this.props.onContextMenuDismiss();
                        }
                     })
                }
            });
        }
    }

     // @ts-ignore
    private _onRenderDetailsHeader = (props?: IDetailsHeaderProps, defaultRender?: IRenderFunction<IDetailsHeaderProps>): JSX.Element => {
        return (
          <Sticky stickyPosition={StickyPositionType.Header}>
            <DetailsHeader
                layoutMode={this.props.layoutMode ? this.props.layoutMode : DetailsListLayoutMode.justified}
                {...props}
                // @ts-ignore
                onRenderColumnHeaderTooltip={(props?: ITooltipHostProps, defaultRender?: IRenderFunction<ITooltipHostProps>) => {
                     return <TooltipHost {...props}/>
                    }}
            />
          </Sticky>
        );
    }

    private _onRenderGroupHeader = (props?: IDetailsHeaderProps, defaultRender?: IRenderFunction<IDetailsHeaderProps>): JSX.Element => {
        return (
          /* <Sticky stickyPosition={StickyPositionType.Footer}> */
            <div>{defaultRender!(props)}</div>
          /* </Sticky> */
        );
    }

}

export function copyAndSortItems<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.sort((a: T, b: T) => {
        if(typeof a[key] === 'string') {    
            return String(isSortedDescending ? b[key] : a[key]).localeCompare(String(isSortedDescending ? a[key] : b[key]), undefined, {sensitivity: 'base'})
        } else {
            return (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1;
        }
    });
}

export function sortAscending(a: any, b: any): any {
    if(typeof a === 'string') {
        return a.localeCompare(b, undefined, {sensitivity: 'base'});
    } else {
        return a > b ? 1 : b > a ? -1 : 0;
    }
}

export default AdvancedDetailsList;