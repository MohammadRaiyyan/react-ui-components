import Tabs from ".";

export default function TabsDemo() {
  return (
    <Tabs activeTabId="tab1">
      <Tabs.TabList>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel tabId="tab1">
        <div>
          {/* Form demo */}
          <form>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message"></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Tabs.TabPanel>
      <Tabs.TabPanel tabId="tab2">
        {/*Cards Demo*/}
        <div style={{ display: "flex", gap: "1rem" }}>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
            }}
          >
            <h3>Card Title 1</h3>
            <p>This is a description for card 1.</p>
            <button>Action 1</button>
          </div>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
            }}
          >
            <h3>Card Title 2</h3>
            <p>This is a description for card 2.</p>
            <button>Action 2</button>
          </div>
        </div>
      </Tabs.TabPanel>
      <Tabs.TabPanel tabId="tab3">
        <div>
          {/* List Demo */}
          <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
            <li>List Item 4</li>
          </ul>
        </div>
      </Tabs.TabPanel>
    </Tabs>
  );
}
