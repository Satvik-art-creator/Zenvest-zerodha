import "./skeleton.css";

export default function Skeleton({ title }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {title.map((el, i) => {
            if (i === 0) {
              return (
                <th key={i} colSpan={2}>
                  {el}
                </th>
              );
            }
            return <th key={i}>{el}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {[...Array(6)].map((_, i) => (
          <tr key={i}>
            
            {title.map((el, i) => {
              if (i === 0) {
                return (
                  <td colSpan={2}>
                    <div className="skeleton w-75 text-center"></div>
                  </td>
                );
              }
              return <td><div className="skeleton w-50"></div></td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
