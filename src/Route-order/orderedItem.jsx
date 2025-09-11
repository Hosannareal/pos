import "./orderedItem.css"

export default function OrderedItem({ item }) {
  return (
    <div className="ordered-section">
      <div className="ordered-item">
        <div className="ordered-item-name">
          {item.name || item.SpecialItem?.name}
        </div>
        <div className="count-prize">
          <div className="ordered-item-count">x{item.count}</div>
          <div className="ordered-item-prize">₹ {item.subTotalPrice}</div>
        </div>
      </div>

      {item.varientChoiceData ? (
        <div className="ordered-item-info">
          {Object.entries(item.varientChoiceData).map(([key, value]) => (
            <div key={key} className="ordered-item-info-half">
              x{value} {key}
            </div>
          ))}
        </div>
      ) : null}

      <hr className="ordered-item-info-seperation" />

      { item.note|| true ? (
        <div className="ordered-item-note-section">
          <div className="ordered-item-note-label"></div>
          {item.note ? 
          <div className="ordered-item-actualnote">
            <span>📝</span>  item.note
          </div>
          : null }
        </div>
      ) : null}
    </div>
  )
}
