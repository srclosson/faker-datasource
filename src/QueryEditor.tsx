import React, { PureComponent, RefObject, FocusEvent, ChangeEvent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { FakerQuery, FakerDataSourceOptions } from './types';

type Props = QueryEditorProps<DataSource, FakerQuery, FakerDataSourceOptions>;

interface State {}

export class QueryEditor extends PureComponent<Props, State> {
  editorRef: RefObject<HTMLElement> | any;
  cm: any;
  constructor(props: any) {
    super(props);
    this.cm = {};
    this.editorRef = React.createRef();
  }

  onComponentDidMount() {}

  componentWillUnmount() {}

  onBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, script: event.target.value });
    onRunQuery();
  };

  onChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, script: event.target.value });
  };

  render() {
    return (
      <div className="gf-form">
        <textarea ref={this.editorRef} value={this.props.query.script} onChange={this.onChangeInput} className="gf-form-input" onBlur={this.onBlur} />
      </div>
    );
  }
}
