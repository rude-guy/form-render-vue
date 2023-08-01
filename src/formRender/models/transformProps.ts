const transformProps = (props: any) => {
  const { column, displayType, ...rest } = props;
  return {
    column: column || 3,
    displayType: displayType || 'vertical',
    ...rest,
  };
};

export default transformProps;
