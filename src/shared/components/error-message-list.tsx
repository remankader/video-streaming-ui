function ErrorMessageList({ errorMessageList }: { errorMessageList: [] }) {
  return (
    <>
      {errorMessageList.length ? (
        <div>
          <div className="alert alertDanger" role="alert">
            <ul>
              {errorMessageList.map((each: any, k: number) => {
                return (
                  <li key={k} className="bulletListItem">
                    <span>{each.msg || "Something went wrong"}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ErrorMessageList;
