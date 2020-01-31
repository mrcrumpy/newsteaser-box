import Tabs from "./tabs";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

[].forEach.call(document.getElementsByClassName("tabs"), (el: HTMLElement) => {
  const tabs = new Tabs(el);
  const max = el.querySelectorAll('[role="tab"]').length;
  const randomInt = getRandomInt(max);
  tabs.init(randomInt);
});
