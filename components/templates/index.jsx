"use client";

import { Template1 } from "./template-1";
import { Template2 } from "./template-2";
import { Template3 } from "./template-3";
import { Template4 } from "./template-4";
import { Template5 } from "./template-5";
import { Template6 } from "./template-6";
import { Template7 } from "./template-7";
import { Template8 } from "./template-8";
import { Template9 } from "./template-9";
import { Template10 } from "./template-10";
import { Template11 } from "./template-11";
import { Template12 } from "./template-12";
import { Template13 } from "./template-13";
import { Template14 } from "./template-14";
import { Template15 } from "./template-15";
import { Template16 } from "./template-16";
import { Template17 } from "./template-17";
import { Template18 } from "./template-18";
import { Template19 } from "./template-19";
import { Template20 } from "./template-20";
import { Template21 } from "./template-21";
import { Template22 } from "./template-22";
import { Template23 } from "./template-23";
import { Template24 } from "./template-24";
import { Template25 } from "./template-25";

const map =
  new Map() <
  number >
  [
    [1, Template1],
    [2, Template2],
    [3, Template3],
    [4, Template4],
    [5, Template5],
    [6, Template6],
    [7, Template7],
    [8, Template8],
    [9, Template9],
    [10, Template10],
    [11, Template11],
    [12, Template12],
    [13, Template13],
    [14, Template14],
    [15, Template15],
    [16, Template16],
    [17, Template17],
    [18, Template18],
    [19, Template19],
    [20, Template20],
    [21, Template21],
    [22, Template22],
    [23, Template23],
    [24, Template24],
    [25, Template25],
  ];

export function getTemplateComponent(id) {
  return map.get(id) ?? Template1;
}

export const TEMPLATES = {
  "template-1": Template1,
  "template-2": Template2,
  "template-3": Template3,
  "template-4": Template4,
  "template-5": Template5,
  "template-6": Template6,
  "template-7": Template7,
  "template-8": Template8,
  "template-9": Template9,
  "template-10": Template10,
  "template-11": Template11,
  "template-12": Template12,
  "template-13": Template13,
  "template-14": Template14,
  "template-15": Template15,
  "template-16": Template16,
  "template-17": Template17,
  "template-18": Template18,
  "template-19": Template19,
  "template-20": Template20,
  "template-21": Template21,
  "template-22": Template22,
  "template-23": Template23,
  "template-24": Template24,
  "template-25": Template25,
};

export const TEMPLATE_LIST = Object.keys(TEMPLATES);
