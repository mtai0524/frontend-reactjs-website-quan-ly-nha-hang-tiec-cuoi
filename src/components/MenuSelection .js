// React Component

import React, { Component } from 'react';

class MenuSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [], // Danh sách các món ăn đã chọn
        };
    }

    handleItemSelection = (itemId) => {
        const { selectedItems } = this.state;
        if (selectedItems.includes(itemId)) {
            this.setState({
                selectedItems: selectedItems.filter((id) => id !== itemId),
            });
        } else {
            this.setState({
                selectedItems: [...selectedItems, itemId],
            });
        }
    };

    handleOrderSubmit = () => {
        // Gửi danh sách món ăn đã chọn đến API ASP.NET Core
        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedItems: this.state.selectedItems }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý phản hồi từ API (nếu cần)
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    render() {
        // Hiển thị danh sách món ăn và checkbox
        return (
            <div>
                <ul>
                    {menuItems.map((menuItem) => (
                        <li key={menuItem.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={menuItem.id}
                                    checked={this.state.selectedItems.includes(menuItem.id)}
                                    onChange={() => this.handleItemSelection(menuItem.id)}
                                />
                                {menuItem.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <button onClick={this.handleOrderSubmit}>Xác nhận đặt hàng</button>
            </div>
        );
    }
}

export default MenuSelection;
