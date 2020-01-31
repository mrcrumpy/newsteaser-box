/*
 *  This is a simplified variant of the w3 accessible tabs:
 *  https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html
 *
 */

class Tabs {
  domNode: HTMLElement;
  tablist: Element;
  tabs: NodeListOf<HTMLElement & { index: number }>;
  panels: NodeListOf<HTMLElement>;
  keys: {
    end: number;
    home: number;
    left: number;
    right: number;
    enter: number;
    space: number;
  };
  direction: {
    37: number;
    38: number;
    39: number;
    40: number;
  };

  constructor(domNode: HTMLElement) {
    this.tablist = domNode.querySelectorAll('[role="tablist"]')[0];
    this.domNode = domNode;

    this.keys = {
      end: 35,
      home: 36,
      left: 37,
      right: 39,
      enter: 13,
      space: 32
    };

    this.direction = {
      37: -1,
      38: -1,
      39: 1,
      40: 1
    };
    this.generateArrays();
  }

  init(activated?: number) {
    for (let i = 0; i < this.tabs.length; i += 1) {
      this.addListeners(i);
      if (activated !== undefined && activated < this.tabs.length) {
        this.activateTab(this.tabs[activated], false);
      }
    }
  }

  generateArrays() {
    this.tabs = this.domNode.querySelectorAll('[role="tab"]');
    this.panels = this.domNode.querySelectorAll('[role="tabpanel"]');
  }

  addListeners(index: number) {
    this.tabs[index].addEventListener(
      "click",
      this.clickEventListener.bind(this)
    );
    this.tabs[index].addEventListener(
      "keydown",
      this.keydownEventListener.bind(this)
    );
    this.tabs[index].addEventListener(
      "keyup",
      this.keyupEventListener.bind(this)
    );

    // Build an array with all this.tabs (<button>s) in it
    this.tabs[index].index = index;
  }

  clickEventListener(event) {
    const tab = event.target;
    this.activateTab(tab, false);
  }

  keydownEventListener(event: KeyboardEvent) {
    const key = event.keyCode;

    switch (key) {
      case this.keys.end:
        event.preventDefault();
        // Activate last tab
        this.focusLastTab();
        break;
      case this.keys.home:
        event.preventDefault();
        // Activate first tab
        this.focusFirstTab();
        break;

      default:
        break;
    }
  }

  keyupEventListener(event) {
    const key = event.keyCode;

    switch (key) {
      case this.keys.left:
      case this.keys.right:
        this.switchTabOnArrowPress(event);
        break;
      case this.keys.enter:
      case this.keys.space:
        this.activateTab(event.target, true);
        break;
      default:
        break;
    }
  }

  switchTabOnArrowPress(event: KeyboardEvent) {
    const pressed = event.keyCode;

    if (this.direction[pressed]) {
      const target = event.target;
      if (target.index !== undefined) {
        if (this.tabs[target.index + this.direction[pressed]]) {
          this.tabs[target.index + this.direction[pressed]].focus();
        } else if (pressed === this.keys.left) {
          this.focusLastTab();
        } else if (pressed === this.keys.right) {
          this.focusFirstTab();
        }
      }
    }
  }

  activateTab(tab: HTMLElement, setFocus: boolean) {
    // Deactivate all other tabs
    this.deactivateTabs();

    // Remove tabindex attribute
    tab.removeAttribute("tabindex");

    // Set the tab as selected
    tab.setAttribute("aria-selected", "true");

    // Get the value of aria-controls (which is an ID)
    const controls = tab.getAttribute("aria-controls");

    // Remove hidden attribute from tab panel to make it visible
    document.getElementById(controls).removeAttribute("hidden");

    // Set focus when required
    if (setFocus) {
      tab.focus();
    }
  }

  deactivateTabs() {
    for (let t = 0; t < this.tabs.length; t += 1) {
      this.tabs[t].setAttribute("tabindex", "-1");
      this.tabs[t].setAttribute("aria-selected", "false");
    }

    for (let p = 0; p < this.panels.length; p += 1) {
      this.panels[p].setAttribute("hidden", "hidden");
    }
  }

  focusFirstTab() {
    this.tabs[0].focus();
  }

  // Make a guess
  focusLastTab() {
    this.tabs[this.tabs.length - 1].focus();
  }
}

export default Tabs;
