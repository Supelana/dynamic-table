import { WeighingListDataType } from '../../enums/weighing-list-data-type.enum.js';

let state;
let component;

export const WeighingListFilterComponent = {

    state: {
        docFragment: new DocumentFragment(),
        domParser: new DOMParser(),
        weighingList: undefined,
        language: []
    },

    render(weighingListState) {
        component = this;
        state = this.state;
        state.weighingList = weighingListState.weighingList;
        state.language = weighingListState.language;

        this.renderContainer();
        this.renderInputs();
        this.renderButtons();

        weighingListState.docFragment.appendChild(state.docFragment);
    },

    renderContainer() {
        const container = this.createElement(`
            <div class="row">
                <div class="accordionMod" id="accordion1">
                    <div class="accordion-item panel">
                        <div class="panel-heading">
                            <h4 class="accordion-toggle current" data-toggle="collapse" data-parent="#accordion1" data-target="#collapseBox1_1">
                                <i class="fa fa-minus"></i>
                                ${state.language['FILTER-HEADER']}
                            </h4>
                        </div>
                        <div id="collapseBox1_1" class="panel-collapse collapse in">
                            <section id="filter-section" class="accordion-inner panel-body"></section>
                        </div>
                    </div>
                </div>
            </div>
        `);

        state.docFragment.appendChild(container);
    },

    renderInputs() {
        const section = state.docFragment.querySelector('#filter-section');
        const filters = state.weighingList.definition.filters;
        let column1, column2, column3;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            filter.id = i;

            switch (filter.dataType) {
                case WeighingListDataType.Date:
                    if (!column1) {
                        column1 = document.createElement('div');
                        column1.classList.add('col-lg-2', 'col-md-2', 'col-sm-2', 'col-xs-12');
                    }

                    this.renderDateInput(filter, column1);
                    break;

                case WeighingListDataType.Dropdown:
                    if (!column2) {
                        column2 = document.createElement('div');
                        column2.classList.add('col-lg-6', 'col-md-6', 'col-sm-6', 'col-xs-12');
                    }

                    this.renderDropdown(filter, column2);
                    break;

                case WeighingListDataType.String:
                case WeighingListDataType.Bool:
                    if (!column3) {
                        column3 = document.createElement('div');
                        column3.classList.add('col-lg-4', 'col-md-4', 'col-sm-4', 'col-xs-12');
                    }

                    if (filter.dataType === WeighingListDataType.String) {
                        this.renderTextInput(filter, column3);
                    } else {
                        this.renderCheckbox(filter, column3);
                    }

                    break;
            }

        }

        if (column1) { section.appendChild(column1); }
        if (column2) { section.appendChild(column2); }
        if (column3) { section.appendChild(column3); }
    },

    renderCheckbox(filter, column) {
        const checkbox = this.createElement(`
            <div class="row">
                <label id="filter-${filter.id}-label" class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                    ${filter.displayText}
                </label>
                <div class="input-group">
                    <input id="filter-${filter.id}" type="checkbox" class="checkbox checkbox-large">
                </div>
            </div>
        `);

        if (filter.helpText) {
            this.renderHelpText(filter, checkbox);
        }

        column.appendChild(checkbox);
    },

    renderTextInput(filter, column) {
        const input = this.createElement(`
            <div class="row">
                <label id="filter-${filter.id}-label" class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                    ${filter.displayText}
                </label>
                <input id="filter-${filter.id}" type="text" class="form-control" style="width: 55%">
            </div>
        `);

        if (filter.helpText) {
            this.renderHelpText(filter, input);
        }

        column.appendChild(input);
    },

    renderDateInput(filter, column) {
        const input = this.createElement(`
            <div class="row">
                <label id="filter-${filter.id}-label">
                    ${filter.displayText}
                </label>
                <div class="input-group date cursorPointer">
                    <input id="filter-${filter.id}" type="text" class="form-control" value="${filter.value}">
                    <span class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </span>
                </div>
            </div>
        `);

        if (filter.helpText) {
            this.renderHelpText(filter, input);
        }

        column.appendChild(input);
    },

    renderDropdown(filter, column) {
        const dropdown = this.createElement(`
            <div class="row bottom-pad-smaller">
                <label id="filter-${filter.id}-label" class="col-sm-3 col-xs-12">
                    ${filter.displayText}
                </label>
                <div class="col-sm-9 col-xs-12">
                    <select id="filter-${filter.id}" class="select2 select" style="width: 100%" placeholder="${filter.helpText}">
                        <option value=' '></option>
                    </select>
                </div>
            </div>
        `);

        if (filter.helpText) {
            this.renderHelpText(filter, dropdown);
        }

        const select = dropdown.querySelector(`#filter-${filter.id}`);

        for (let i = 0; i < filter.options.length; i++) {
            const filterOption = filter.options[i];

            const option = document.createElement('option');
            option.textContent = filterOption.text;
            option.value = filterOption.value;

            select.appendChild(option);
        }

        column.appendChild(dropdown);
    },

    renderHelpText(filter, element) {
        const i = document.createElement('i');
        i.classList.add('fa', 'fa-question-circle');
        i.title = filter.helpText;

        element.querySelector(`#filter-${filter.id}-label`).appendChild(i);
    },

    renderButtons() {
        const buttons = this.createElement(`
            <div class="row">
                <input id="filter-clear" type="button" class="btn-grey btn-small btn-pad pull-right" value="${state.language['RESET']}" />
                <input id="filter-apply" type="button" class="btn-grey btn-small btn-pad pull-right btn-color" value="${state.language['SHOW-OVERVIEW']}" />
            </div>
        `);

        buttons.querySelector('#filter-clear').onclick = function () {
            component.clearFilters();
        };

        buttons.querySelector('#filter-apply').onclick = function () {
            component.applyFilters();
        };

        state.docFragment.appendChild(buttons);
    },

    clearFilters() {
        const filters = state.weighingList.definition.filters;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            const filterId = `#filter-${filter.id}`;
            const input = document.querySelector(filterId);

            switch (filter.dataType) {
                case WeighingListDataType.Bool:
                    input.checked = false;
                    break;
                case WeighingListDataType.String:
                    input.value = null;
                    break;
                case WeighingListDataType.Dropdown:
                    $(filterId).val(' ').trigger("change");
                    break;
            }
        }
    },

    applyFilters() {
        console.log('Apply filters');
    },

    createElement(htmlString) {
        return state.domParser.parseFromString(htmlString, 'text/html').body.firstChild;
    }
}