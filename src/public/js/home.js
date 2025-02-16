function putUpdateUser(button) {
    let row = button.closest("tr");
    let cells = row.querySelectorAll("td");

    // Lưu dữ liệu cũ trước khi chỉnh sửa
    row.dataset.originalData = JSON.stringify({
        email: cells[1].innerText.trim(),
        name: cells[2].innerText.trim(),
        city: cells[3].innerText.trim(),
    });

    for (let i = 1; i < cells.length - 1; i++) {
        let value = cells[i].innerText.trim();
        console.log(`value`, value);
        cells[i].innerHTML = `<input type="text" value="${value}">`;
    }

    // Thêm nút "Cancel" bên cạnh "Save"
    button.innerText = "Save";
    button.classList.remove("edit");
    button.classList.add("save");
    button.setAttribute("onclick", "saveUser(this)");

    let cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.classList.add("cancel");
    cancelButton.setAttribute("onclick", "cancelEdit(this)");

    // Chèn nút "Cancel" vào ngay sau nút "Save"
    button.parentElement.appendChild(cancelButton);
}

function cancelEdit(button) {
    let row = button.closest("tr");
    let cells = row.querySelectorAll("td");

    // Lấy lại dữ liệu gốc
    let originalData = JSON.parse(row.dataset.originalData);

    cells[1].innerText = originalData.email;
    cells[2].innerText = originalData.name;
    cells[3].innerText = originalData.city;

    // Xóa nút "Cancel"
    button.remove();

    // Đổi nút "Save" về "Edit"
    let saveButton = row.querySelector(".save");
    saveButton.innerText = "Edit";
    saveButton.classList.remove("save");
    saveButton.classList.add("edit");
    saveButton.setAttribute("onclick", "putUpdateUser(this)");
}

async function saveUser(button) {
    let row = button.closest("tr");
    let cells = row.querySelectorAll("td");

    let id = cells[0].innerText.trim();
    let email = cells[1].querySelector("input").value.trim();
    let name = cells[2].querySelector("input").value.trim();
    let city = cells[3].querySelector("input").value.trim();

    let userData = { id, email, name, city };

    try {
        let response = await fetch("/update-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        let result = await response.json();

        if (response.ok) {
            cells[1].innerText = email;
            cells[2].innerText = name;
            cells[3].innerText = city;

            button.innerText = "Edit";
            button.classList.remove("save");
            button.classList.add("edit");
            button.setAttribute("onclick", "putUpdateUser(this)");

            // Xóa nút "Cancel" sau khi lưu thành công
            let cancelButton = row.querySelector(".cancel");
            if (cancelButton) cancelButton.remove();

            alert("Cập nhật thành công!");
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
        alert("Cập nhật thất bại.");
    }
}

async function deleteUserForId(button) {
    let row = button.closest("tr");
    let cells = row.querySelectorAll("td");

    let id = cells[0].innerText.trim();

    try {
        let response = await fetch("/delete-user", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        let result = await response.json();
        if (response.ok) {
            alert("Xóa thành công!");
            row.remove();
        }
        else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        alert("Xóa thất bại.");
    }
}