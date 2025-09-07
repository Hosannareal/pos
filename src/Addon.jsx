import './Addon.css'

export default function Addon({ showVarientItem, setselectedAddon, selectedAddon }) {
  function handleClick(addon) {
    setselectedAddon((prev) => {
      if (prev.find((a) => a.name === addon.name)) {
        return prev.filter((a) => a.name !== addon.name); // remove
      }
      return [...prev, addon]; // add
    });
  }

  return (
    <div className="addOn-section">
      <div id="addOn-horizontal">
        <div id="addOn-name">Extra Crud</div>
        <div id="addOn-info">Select up to 1 add-on</div>
      </div>

      <div className="addOn-options">
        {showVarientItem.addons?.map((addon) => {
          const isSelected = selectedAddon.some((a) => a.name === addon.name);
          return (
            <div
              className="addOn-cont"
              onClick={() => handleClick(addon)}
              key={addon.name}
            >
              <div className="addOn-half-full-name">{addon.name}</div>
              <div className="addOn-price-checkpoint">
                <div id="addOn-price">₹ {addon.price}</div>
                <div id="addOn-checkpoint">{isSelected ? "✅" : "⚪"}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
