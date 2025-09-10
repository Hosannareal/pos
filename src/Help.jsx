// HELP COMPONENT (POS Edition)
// This component provides quick guidance for POS system users.
// - Shows shortcut keys and usage instructions
// - Designed for fast readability in a POS environment
// - Can be shown in a sidebar, modal, or dedicated help page

import "./Help.css";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

export default function Help() {
  return (
    <div className="centre">
    <TopBar name={"Tiwari Brother's"}/>
    <div className="pos-help">
      <h2 className="pos-help-title">Help & Shortcuts</h2>

      {/* <section className="pos-help-section">
        <h3>🔑 Keyboard Shortcuts</h3>
        <ul>
          <li><span className="key">F1</span> Open Help</li>
          <li><span className="key">Ctrl + N</span> New Order</li>
          <li><span className="key">Ctrl + P</span> Print Bill</li>
          <li><span className="key">Esc</span> Cancel Transaction</li>
        </ul>
      </section> */}

      <section className="pos-help-section">
        <h3>ℹ️ Tips</h3>
        <ul>
          <li>Use the search bar to quickly find products.</li>
          <li>Click on items to add them to the cart instantly.</li>
          <li>Always verify payment method before confirming.</li>
        </ul>
      </section>

      <section className="pos-help-section">
        <h3>📞 Support</h3>
        <p>If you face issues, contact support at <b>+91-9804040410</b></p>
      </section>
    </div>
    <BottomBar />
        </div>
  );

}
