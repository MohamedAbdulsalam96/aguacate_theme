var frm_data;

function exPage(wrapper) {
  $("#aguacate-container").remove();
  console.log("on_refresh");
  route = frappe.get_route();
  if (route[0]) {
    if (route[0] == "Form") {
      if (route[1]) {
        frappe.ui.form.on(route[1], {
          load() {
            $("#aguacate-container").html("");
          },
          refresh(frm) {
            getAguacateMenu(route[1], wrapper, frm);
          },
        });
      }
    }
  }
}

async function getAguacateMenu(route, wrapper, frm) {
  frm_data = frm;
  await $("#aguacate-container").remove();
  await frappe.call({
    method:
      "aguacate_theme.aguacate_dashboard.doctype.aguacate_dashboard.aguacate_dashboard.getSectionBreak",
    args: {
      dt: route,
    },
    btn: $(".primary-action"),
    freeze: false,
    callback: async (r) => {
      let data_html = "";
      let css_classes = "";
      let container_box = "";
      let data = r;
      await $(wrapper).find("#aguacate-container").remove();
      if (frm.is_new()) {
        await data.message.forEach((category) => {
          data_html += `<div class="desk-sidebar-item standard-sidebar-item"> <span class="sidebar-item-label" name="${__(
            category.label
          )}" id="${category.fieldname}" onclick="clmenu('${
            category.fieldname
          }', '${category.label}', '${frm}');">${__(
            category.label
          )}</span></div>`;
        });
        css_classes =
          "desk-sidebar list-unstyled sidebar-menu aguacate-container-vertical col-lg-2";
        container_box = ".layout-side-section";
        $(wrapper)
          .find(container_box)
          .append(
            $(
              `<div class="${css_classes}" id="aguacate-container" class="aguacate-container"><div class="standard-sidebar-section"><div class="standard-sidebar-label aguacate-nvert-label" >Navigation</div>${data_html}</div></div>`
            )
          );
        console.log("is new");
      } else {
        await data.message.forEach((category) => {
          data_html += `<li class="nav-item" id="${
            category.fieldname
          }" onclick="clmenu('${category.fieldname}', '${
            category.label
          }');">${__(category.label)}</li>`;
        });
        css_classes = "navbar navbar-light navbar-expand-lg aguacate-nav";
        container_box = ".page-head-content";
        $(wrapper)
          .find(container_box)
          .append(
            $(
              `<div class="container" id="aguacate-container" class="aguacate-container"><nav class="${css_classes}"><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#aguacate-sec-menu" aria-controls="aguacate-sec-menu" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button><div class="collapse navbar-collapse" id="aguacate-sec-menu"><ul class="navbar-nav mr-auto mt-2 mt-lg-0" id="aguacate-nav">${data_html}</ul></nav></div></div>`
            )
          );
      }

      console.log("added data");
    },
    error: (r) => {
      // on error
      console.log("Error: ", r);
    },
  });
}

function clmenu(name, label) {
  $("html, body").animate(
    {
      scrollTop: $(`.section-head:contains('${label}')`).offset().top - 150,
    },
    1000
  );
  console.log(frm_data);
  frm_data.fields_dict[`${name}`].collapse(0);
}
